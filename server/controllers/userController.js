module.exports = {
    editProfilePic: async (req,res) => {
        // console.log(req.session)
        // console.log(req.body)
        const {id} = req.session.user
        const {imgUrl} = req.body
        const db = req.app.get('db')
        console.log('editpic hit', imgUrl)
       await db.user.edit_user_info([imgUrl,id])
        .then(user => res.status(200).send(user))
        .catch(err => console.log(err))
    }
}