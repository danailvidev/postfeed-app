var mongoose = require('mongoose')

module.exports = mongoose.model('Post', {
    content: String,
    createdBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        email: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
})