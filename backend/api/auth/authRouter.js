var express = require('express')
var controller = require('./authController.js')
var authRouter = express.Router()

authRouter.route('/register')
    .post(controller.register)

authRouter.route('/login')
    .post(controller.login)

module.exports = authRouter