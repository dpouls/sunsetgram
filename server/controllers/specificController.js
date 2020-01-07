module.exports =  {
    getSpecificUserInfo: (req,res) => {
        const  {id} = req.params
        const db = req.app.get('db')
        db.specific_user.get_specific_user_info(+id)
        .then(info => {res.status(200).send(info)})
        .catch(err => res.status(500).send(err))
    }
}
