module.exports = {
    follow: (req, res) => {
        console.log('req.body',req.body,'session',req.session)
        const db = req.app.get('db')
        const {id} = req.session.user
        const {followed_id} = req.body 
        db.followers.follow([id,followed_id])
        .then(followers => res.status(200).send(followers))
        .catch(err => console.log(err))
    },
    unfollow: (req, res) => {
        console.log('unfollow','req.body',+req.body.followed_id,'session',req.session.user.id)
        const db = req.app.get('db')
        const {id} = req.session.user
        const {followed_id} = req.body 
        db.followers.unfollow([id,+followed_id])
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
    },
    getSpecificUserFollowers: (req, res) => {
        console.log('followers hit',req.body)

        const db = req.app.get('db')
        const {id} = req.params
        // const {followed_id} = req.params 
        db.followers.get_followers(+id)
        .then(followers => res.status(200).send(followers))
        .catch(err => console.log(err))
    },
    getSpecificUserFollowing: (req, res) => {
        console.log('following hit', req.params)
        const db = req.app.get('db')
        const {id} = req.params
        // const {followed_id} = req.body 
        db.followers.get_following(+id)
        .then(followers => res.status(200).send(followers))
        .catch(err => console.log(err))
    }
}