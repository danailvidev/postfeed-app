var router = require('express').Router()

var authRouter = require('../api/auth/authRouter.js')

router.use('/auth', authRouter)

module.exports = router