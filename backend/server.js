var express = require('express')
var app = express()
var config = require('./config/config')
var httpServer = require('http').createServer(app)
var api = require('./middleware/routes')

// middleware 
require('./middleware/options')(app)

// db connect
require('./middleware/database')()

// routes
 app.use('/api', api)

// socket.io
require('./middleware/socketio')(httpServer)

httpServer.listen(config.port || 3000)