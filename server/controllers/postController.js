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
    


    addPost: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.session.user
        const {image_url,caption} = req.body
        const newDate = new Date()
        db.post.add_post([id,image_url,caption,newDate])
        .then(posts => {res.status(200).send(posts)})
        .catch(err => console.log(err))
    },
    editPost: (req, res) => {
        const {post_id} = req.params
        const db = req.app.get('db')
        const {caption} = req.body
        // console.log(new Date())

        // console.log(caption)
        db.post.edit_post([caption,post_id])
        .then(post => res.status(200).send(post) )
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