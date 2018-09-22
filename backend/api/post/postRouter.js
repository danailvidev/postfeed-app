var express = require('express')
var authController = require('../auth/authController.js')
var controller = require('./postController.js')
var postRouter = express.Router()

postRouter.param('id', controller.params)

postRouter.route('/:id')
    .delete(authController.checkAuthenticated, controller.deleteOne)

postRouter.route('/')
    .get(authController.checkAuthenticated, controller.get)
    .post(authController.checkAuthenticated, controller.post)

module.exports = postRouter