module.exports = {
    addLike: (req, res) => {
        const {post_id} = req.params
        console.log('addlike post_id', post_id)
        console.log(' add like hit, session:',req.session.user.id)

        const db = req.app.get('db')
        db.post.likes.like([req.session.user.id, +post_id])
        .then(posts => {res.status(200).send(posts)})
        .catch(err => console.log(err))
    },
    getLikers: (req, res) => {
        const {post_id} = req.params
        const db = req.app.get('db')
        db.post.likes.get_likers(+post_id)
        .then(likers => res.status(200).send(likers))
        .catch(err => console.log(err))
    },
    getLikes: (req, res) => {
        const {post_id} = req.params
        const db = req.app.get('db')
        db.post.likes.like_count(post_id)
        .then(count => {res.status(200).send(count)})
        .catch(err => console.log(err))
    },

    unlike: (req,res) => {
        const {post_id} = req.params
        console.log('j',req.params)
        const db = req.app.get('db')
        db.post.likes.unlike([req.session.user.id,post_id])
        .then(likes => res.status(200).send(likes))
        .catch(err => console.log(err))
    }
}