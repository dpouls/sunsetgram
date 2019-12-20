const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req,res) => {
        const {username,password} = req.body 
        const db = req.app.get('db')
        const {session} = req

        let user = await db.user.check_user(username)
        user = user[0]
        if(user){
            return res.status(400).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)

        let newUser = await db.user.register_user(username, hash)
        newUser = newUser[0]
        
        let sessionUser = newUser
        session.user = sessionUser
        res.status(201).send(session.user)
    }
}