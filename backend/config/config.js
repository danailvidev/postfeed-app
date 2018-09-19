let config = {
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.PORT || 3000,
    bcryptSecret: process.env.CRYPT_SECRET || 'postfeed9812',
    mlabCom: process.env.MONGOLAB_URL || 'mongodb://dbadmin:postfeed9812@ds161102.mlab.com:61102/postfeed'
}

process.env.NODE_ENV = process.env.NODE_ENV || config.dev
config.env = process.env.NODE_ENV

let envConfig

try {
    envConfig = require('./' + config.env)
    envConfig = envConfig || {}
} catch (e) {
    envConfig = {}
}

module.exports = Object.assign({}, config, envConfig)