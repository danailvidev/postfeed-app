var User = require('../user/userModel.js')
var config = require('../../config/config')
var jwt = require('jwt-simple')
var bcrypt = require('bcrypt-nodejs')

let register = async (req, res) => {
    const {
        email
    } = req.body    

    // check for existing email
    var user = await User.findOne({
        email: email
    })

    if (user) {
        return res.status(422).send({
            message: 'Email Already Exist'
        })
    } else {
        user = new User(req.body)
    }

    user.save((err, newUser) => {
        if (err) {
            console.log('error')
            return res.status(400).send({
                err
            })
        } else {
            createSendToken(res, newUser)
        }
    })
}

let login = async (req, res) => {
    const {
        email,
        password
    } = req.body

    // search db for the user email
    var user = await User.findOne({
        email: email
    })

    // validations
    if (!user) {
        return res.status(401).send({
            message: 'Email or Password Invalid'
        })
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) {
            return res.status(401).send({
                message: 'Email or Password Invalid'
            })
        } else {
            createSendToken(res, user)
        }
    })
}

function createSendToken(res, user) {
    var payload = {
        sub: user._id,
        email: user.email
    }

    var token = jwt.encode(payload, config.bcryptSecret)
    const userData = {
        email: user.email,
        id: user._id
    }

    res.status(200).send({
        token: token,
        userData: userData
    })
}


let checkAuthenticated = (req, res, next) => {
    if (!req.header('authorization')) {
        return res.status(401).send({
            message: 'Unauthorized, Missing Auth Header'
        })
    }

    var token = req.header('authorization').split(' ')[1]

    var payload = jwt.decode(token, config.bcryptSecret)

    if (!payload) {
        return res.status(401).send({
            message: 'Unauthorized, Auth Header Invalid'
        })
    }

    req.id = payload.sub
    req.email = payload.email

    next()
}


let authController = {
    checkAuthenticated,
    register,
    login
}

module.exports = authController