module.exports = function (server) {
    var io = require('socket.io')(server);
    var postController= require('../api/post/postController')

    var numUsers = 0;

    io.on('connection', function (socket) {
        var addedUser = false;

        // when the client emits 'new post', this listens and executes
        socket.on('new post', function (data) {

            // we tell the client to execute 'new post'
            socket.broadcast.emit('post', data);

            // save the msg to db
            postController.saveThroughSocket(data)
        });

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', function () {
            socket.broadcast.emit('typing', {
                username: socket.username
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', function () {
            socket.broadcast.emit('stop typing', {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function () {
            if (addedUser) {
                --numUsers;

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers
                });
            }
        });

    });
}