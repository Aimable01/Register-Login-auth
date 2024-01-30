const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username:{type:String, unique: true, required: true},
    email:{type:String, required:true},
    password:{type:String, required:true}
})

//hash the password
userSchema.pre('save', async function(next){
    const user = this
    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    next()
})

//compare the passwords
userSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User;