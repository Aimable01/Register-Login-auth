const express = require('express')
const router = express.Router()

const userControllers = require('../controllers/userController')

router.get('/register', userControllers.registerGet)
router.post('/register', userControllers.registerPost)

router.get('/login', userControllers.loginGet)
router.post('/login', userControllers.loginPost)

router.get('/dashboard', userControllers.dashboardGet)

module.exports = router