var Post = require('./postModel.js')

const params = async (req, res, next) => {
    try {
        let id = req.params.id
        let post = await Post.findById(id)
        if (!post) {
            next(new Error('No post with that id'))
        } else {
            req.post = post;
            next()
        }
    } catch (err) {
        next(err)
    }
}

const get = async (req, res) => {
    try {
        let posts = await Post.find({}, '-__v -hash').sort({createdAt: 'desc'}) // remove unwanted props
        if (posts) {
            res.send(posts)
        } else {
            res.send([])
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const deleteOne = async (req, res) => {
    try {
        let id = req.params.id
        var post = await Post.findByIdAndRemove(id)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
}

const postComment = async (req, res) => {

        let post = req.post

        let comment = {}
        comment.content = req.body.content
        comment.createdBy = {}
        comment.createdBy.id = req.userId
        comment.createdBy.email = req.userEmail
        
        post.comments.push(comment)

        post.save((err, results) => {
            if (err) {
                console.error('saving post error')
                return res.status(500).send({
                    message: 'saving post error'
                })
            } else {
                res.status(200).send({
                    result: true,
                    id: results._id
                })
            }
        })
}

const post = (req, res) => {
    var postData = req.body

    postData.createdBy = {}
    postData.createdBy.id = req.userId
    postData.createdBy.email = req.userEmail

    var post = new Post(postData)

    post.save((err, results) => {
        if (err) {
            console.error('saving post error')
            return res.status(500).send({
                message: 'saving post error'
            })
        } else {
            res.status(200).send({
                result: true,
                id: results._id
            })
        }
    })
}

var postController = {
    params,
    get,
    deleteOne,
    post,
    postComment
}

module.exports = postController