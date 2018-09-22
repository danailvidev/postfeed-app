var router = require('express').Router()
var postRouter = require('../api/post/postRouter.js')
var authRouter = require('../api/auth/authRouter.js')

router.use('/auth', authRouter)
router.use('/post', postRouter)

module.exports = router