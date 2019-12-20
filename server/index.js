//npm i axios express massive express-session react-router-dom gradient-string bcryptjs redux
require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      {SERVER_PORT, CONNECTION_STRING,SESSION_SECRET} = process.env,
      session = require('express-session'),
      pc = require('./controllers/postController'),
      ac = require('./controllers/authController'),
      gradient = require('gradient-string'),
      app = express();

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))



massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log(gradient.instagram('db connected'))
})

//AUTH ENDPOINTS
// app.post('/auth/login',ac.login)
// app.post('/auth/logout', ac.logout);
app.post('/auth/register', ac.register);

const port = SERVER_PORT || 7000;
app.listen(port, () => console.log(gradient.instagram(`blazin on port ${port}`)))