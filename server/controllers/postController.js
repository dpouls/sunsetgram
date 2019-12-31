module.exports = {
    getAllPosts: (req,res) => {
        const db = req.app.get('db');
        db.post.get_all_posts()
        .then(posts => {res.status(200).send(posts)})
        .catch(err => res.status(500).send(err))
    },
    getMyPosts: (req,res) => {
        const db = req.app.get('db')
        db.post.get_my_posts(req.session.user.id)
        .then(posts => {res.status(200).send(posts)})
        .catch(err => res.status(500).send(err))
    },
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
    },


    addPost: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.session.user
        const {image_url,caption} = req.body
        db.post.add_post([id,image_url,caption])
        .then(posts => {res.status(200).send(posts)})
        .catch(err => console.log(err))
    },
    deletePost: (req, res) => {
        const db = req.app.get('db')
        const {post_id} = req.params
        db.post.delete_post(+post_id)
        .then(posts => {res.status(200).send(posts)})
        .catch(err => console.log(err))
    }
}