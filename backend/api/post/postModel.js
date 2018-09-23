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
    },
    hidden: Boolean,
    meta: {
        likes: Number,
        dislikes: Number
    },
    comments: [{
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
            default: new Date()
        }
    }]
})