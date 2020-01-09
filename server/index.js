//npm i axios express massive express-session react-router-dom gradient-string bcryptjs redux
require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      {S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SERVER_PORT, CONNECTION_STRING,SESSION_SECRET} = process.env,
      session = require('express-session'),
      pc = require('./controllers/postController'),
      ac = require('./controllers/authController'),
      cc = require('./controllers/commentController'),
      lc = require('./controllers/likeController'),
      uc = require('./controllers/userController'),
      fc = require('./controllers/followerController'),
      sc = require('./controllers/specificController'),
      folC = require('./controllers/followingController'),
      aws = require('aws-sdk'),
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
app.post('/auth/login', ac.login)
app.post('/auth/register', ac.register);
app.post('/auth/logout', ac.logout);
app.get('/auth/currentuser', ac.currentUser)


//USER INFO ENDPOINTS

app.put('/api/editprofile', uc.editProfilePic)
app.post('/api/follow', fc.follow)
app.post('/api/unfollow', fc.unfollow)
app.get('/api/getfollowers', fc.getFollowers)
app.get('/api/getfollowing', fc.getFollowing)

//SPECIFIC PROFILE ENDPOINTS
app.get('/api/specificuserinfo/:id',sc.getSpecificUserInfo)
app.get('/api/getspecificfollowers/:id', fc.getSpecificUserFollowers)
app.get('/api/getspecificfollowing/:id', fc.getSpecificUserFollowing)


//POST ENDPOINTS

app.get('/api/posts',pc.getAllPosts)
app.get('/api/myposts/', pc.getMyPosts)
app.post('/api/add',pc.addPost)
app.delete('/api/delete/:post_id', pc.deletePost)
app.put('/api/editpost/:post_id', pc.editPost)
app.get('/api/post/:post_id', pc.getOnePost)

//FOLLOWING POSTS
app.get('/api/followingposts',folC.getFollowingPosts)

//LIKE ENDPOINTS
app.post('/api/like/:post_id',lc.addLike)
app.get('/api/likecount/:post_id', lc.getLikes)
app.get('/api/likers/:post_id',lc.getLikers)
app.delete('/api/unlike/:post_id', lc.unlike)

//COMMENT ENDPOINTS
app.get('/api/comments/:post_id',cc.getAllComments)
app.post('/api/addcomment/:post_id', cc.addComment)
app.delete('/api/deletecomment/:comment_id', cc.deleteComment)
app.put('/api/editcomment/:comment_id', cc.editComment)

//AWS
app.get('/api/signs3', (req, res) => {
    aws.config = {
      region: 'us-west-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    };
  
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
      };
  
      return res.send(returnData);
    });
  });


const port = SERVER_PORT || 7000;
app.listen(port, () => console.log(gradient.instagram(`blazin on port ${port}`)))