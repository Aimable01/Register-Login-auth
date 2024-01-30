const User = require('../models/user')

const registerGet = (req,res)=>{
    render('register')
}

const registerPost = async (req,res)=>{
    const { username, email, password } = req.body
    try {
        const user = new User({username, email, password})
        await user.save()
        res.redirect('app/login')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const loginGet = async (req,res)=>{
    render('login')
}

const loginPost = async (req,res)=>{
    const { username, email, password } = req.body
    try {
        const user = await User.findOne({username})

        if(!user || !(await user.comparePassword(password))){
            res.status(400).json({message: "Invalid user"})
            return;
        }

        req.session.username = user.username
        req.session.userId = user._id
        res.redirect('/app/dashboard')
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const dashboardGet = (req,res)=>{
    if(!req.session.userId){
        res.redirect('/app/dashboard')
        return;
    }

    render('dashboard', { username:req.session.username })
}

module.exports = {
    registerGet,
    registerPost,
    loginGet,
    loginPost,
    dashboardGet
}