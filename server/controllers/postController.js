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
    updateLikes: (req, res) => {
        const {likes} = req.body
        const {post_id} = req.params
        const db = req.app.get('db')
        db.post.update_likes([likes,+post_id])
        .then(posts => {res.status(200).send(posts)})
        .catch(err => console.log(err))
    },
    addPost: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.session.user
        const {image_url,caption} = req.body
        console.log('params',req.params,'body',req.body)
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