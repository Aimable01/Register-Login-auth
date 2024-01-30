const express = require('express')
const app = express()
const port = 8000

const bodyParser = require('body-parser')
const session = require('express-session')


//middle ware
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')


//the sessions
app.use(session({
    secret: "This is my secret key",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60}
}))


//configure routes
app.use('/app','./routes');


//database connection
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONNECT)
.then(()=>{
    console.log(`Connected to mongodb`)
    app.listen(port,()=>console.log(`App running on port ${port}`))
})
.catch(error => {
    console.log(`Error: ${error.message}`)
})