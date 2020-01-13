import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import { getAllPosts } from "./../../redux/postReducer";
import axios from "axios";
import "./Notifications.scss";
// import {withRouter} from 'react-router-dom'




const MappedNotifications = props => {
    const [followed, setFollowed] = useState(false)
    const [following, setFollowing] = useState([])
    useEffect( () => {
     getFollowing()
    //  getFollowed()
    }
    ,[])
    useEffect( () => {
        
        getFollowed()
       }
       ,[following])
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       getFollowed()
    //     },3000);
    //     return () => clearTimeout(timer);
    //   }, []);
    // console.log(followed)
    // console.log(props)

    // const getFollowing =  async () => {
    //     console.log('gfing', props.thisNotification.is_follow)
    //     if(props.thisNotification.is_follow) {

        
    //   await axios.get(`/api/getspecificfollowing/${props.userReducer.user.id}`)
        //   .then(res => setFollowing(res.data))
    //       .then( () => getFollowed())
    //       .then( () => console.log(following))
    //       .catch(err => console.log(err));
    //     //   console.log(following) 
    //     }
        
    //   };
      const getFollowing =  async () => {

        console.log('gfing',props.thisNotification.id, props.thisNotification.is_follow)


        if(props.thisNotification.is_follow) {
            console.log('about to axios call')
      await axios.get(`/api/getspecificfollowing/${props.userReducer.user.id}`)
      .then(res => setFollowing(res.data))
      
        // .then(res => setFollowing(),
                //  getFollowed())
        //   .then(res => {return  setFollowing(res.data) })
        //   .then( () => console.log(following))

        //   .then( () => getFollowed())
          .catch(err => console.log(err));
        //   console.log(following) 
        }
        
      };


     const getFollowed = async () => {
         console.log('gfed')
         console.log(following)
         if(following[0]){
             let filtered = following.filter(el => {
          return el.followed_id === props.thisNotification.id;
        });
        console.log(filtered)
         await filtered.length > 0 && setFollowed(true);
         }
         
      };  
     

    const follow = () => {
        axios.post("/api/follow", { followed_id: props.thisNotification.id }).then(
          res => {
            setFollowed(true)
          }
        );
        followNotification()
      };

      
      const followNotification = () => {
        // const {post} = this.props
        axios.post('/api/addnotification/', {receiver_id: props.thisNotification.id, post_id: 1, is_comment: false, is_like: false, is_follow: true, comment_id: 155})
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
      }
      const unfollow = () => {
        axios.post("/api/unfollow", {
          followed_id: props.thisNotification.id
        }).then(res => {
            setFollowed(false);
          });
      };


return (
    <>      
   {props.thisNotification.is_like ? (
      <div className="notificationContainer">  
 <img className="senderProfPic" src={props.thisNotification.profile_img} alt="profpic" />
 <div className='message'>
     <strong>{props.thisNotification.username}</strong>{' '}liked your photo.
     </div>
       <img
         className="postThumbnail"
         src={props.thisNotification.image_url}
         alt="thumb"
       />
     </div>
   ) : props.thisNotification.is_comment ? (
      <div className="notificationContainer">  
 <img className="senderProfPic" src={props.thisNotification.profile_img} alt="profpic" />

         <div className='message'>
         <strong>{props.thisNotification.username}</strong>{' '}commented:{' '}{props.thisNotification.contents}
       
          </div>
        
       <img
         className="postThumbnail"
         src={props.thisNotification.image_url}
         alt="thumb"
       />
     </div>
   ) : props.thisNotification.is_follow ? (
      <div className="notificationContainer">
 <img className="senderProfPic" src={props.thisNotification.profile_img} alt="profpic" />


         <div className='message'>
           <strong>{props.thisNotification.username}</strong>{' '} started following you.
          </div> 
          <section id="followContainer">
          {followed ? (
            <button onClick={() => unfollow()} id="unfollowBtn">
              Following
            </button>
          ) : (
            <button id="followBtn" onClick={() => follow()}>
              Follow
            </button>
          )}
        </section>
          
       </div>
   ) : null}
 </>
)
}
const mapStateToProps = reduxState => {
    return reduxState;
  };
  export default connect(mapStateToProps)(MappedNotifications);