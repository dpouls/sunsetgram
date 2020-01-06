module.exports = {
    follow: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.session.user
        const {followed_id} = req.body 
        db.followers.follow([id,followed_id])
        .then(followers => res.status(200).send(followers))
        .catch(err => console.log(err))
    },
    getFollowers: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.session.user
        // const {followed_id} = req.body 
        db.followers.get_followers(id)
        .then(followers => res.status(200).send(followers))
        .catch(err => console.log(err))
    },
    getFollowing: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.session.user
        // const {followed_id} = req.body 
        db.followers.get_following(id)
        .then(followers => res.status(200).send(followers))
        .catch(err => console.log(err))
    }
}