module.exports = {
    getMyNotifications: (req, res) => {
        const {id} = req.session.user,
               db = req.app.get('db')
        db.notifications.get_my_notifications(id)
        .then(notifications => res.status(200).send(notifications))
        .catch(err => console.log(err))
    },
    addNotification: (req,res) => {
        db = req.app.get('db')
        console.log(req.body)
        console.log('addNotif hit')
        const sender_id = req.session.user.id
         const {receiver_id,post_id,is_comment,is_like, is_follow,comment_id} = req.body
        db.notifications.new_notification([sender_id,receiver_id,post_id,is_comment,is_like,is_follow,comment_id])
        .then(notification => res.status(200).send(notification))
        .catch(err => console.log(err))
    }
}