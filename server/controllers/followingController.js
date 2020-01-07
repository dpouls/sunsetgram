module.exports = {
    getFollowingPosts: (req,res) => {
        const db = req.app.get('db');
        const {id} = req.session.user
        db.post.following.get_following_posts(id)
        .then(posts => {res.status(200).send(posts)})
        .catch(err => res.status(500).send(err))
    }
}