const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const cors = require('cors')

//middle ware used
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine','ejs')
app.use(cors())


//sessions
app.use(session({
    secret:"This is a secret key",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*2}
}))


app.use('/app', require('./routes/userRoutes'))


//db config
dotenv.config()

mongoose.connect(process.env.DB_CONNECT)
.then(()=>{
    console.log(`Connected to mongodb`)
    app.listen(5000,()=> console.log(`App running on port 5000`))
}).catch(error => console.log(`Error: ${error.message}`))