module.exports = {
    getAllComments: (req,res) => {
        const {post_id} = req. params
        const db = req.app.get('db')
        db.post.comments.get_all_comments(post_id)
        .then(comments => res.status(200).send(comments))
        .catch(err => console.log(err))
    },
    addComment: (req, res) => {
        const {post_id} = req.params
        const {content} = req.body
        const {id} = req.session.user
        const db = req.app.get('db')
        db.post.comments.add_comment([post_id,id,content])
        .then(comments => res.status(200).send(comments))
        .catch(err => console.log(err))
    },
    deleteComment: (req, res) => {
        const {comment_id} = req.params
        const db = req.app.get('db')
        db.post.comments.delete_comment(comment_id)
        .then(comments => res.sendStatus(200))
        .catch(err => console.log(err))
    },
    editComment: (req,res) => {
        const {comment_id} = req.params
        const {content} = req.body
        console.log('editcomment body', req.body)
        const db = req.app.get('db')
        db.post.comments.edit_comment([content, comment_id])
        .then(comment => res.status(200).send(comment))
        .catch(err => console.log(err))
    }
}