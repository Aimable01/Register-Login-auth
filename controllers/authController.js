
const User = require('../models/model')


const registerGet = (req,res)=>{
    res.render('register')
}



const registerPost = async (req,res)=>{
    const {username, password} = req.body
    
    try {
        const user = new User({username,password})
        await user.save()
        res.redirect('/login')
    } catch (error) {
        res.status(401).json({message: error.message})
    }
}



const loginGet = (req,res)=>{
    res.render('/login')
}



const loginPost = async (req,res)=>{
    const { username, password } = req.body

    try {
        const user = await User.findOne({username})

        if(!user || !(await user.comparePassword(password))){
            res.status(401).json({message: error.message})
            return;
        }

        req.session.userId = user._id
        req.session.username = user.username
        res.redirect('/dashboard')
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getDashboard = (req,res)=>{
    if(!user.session.userId){
        res.redirect('/login')
        return;
    }

    res.render('dashboard',{username: req.session.username})
}



module.exports = {
    registerGet,
    registerPost,
    loginGet,
    loginPost,
    getDashboard
}