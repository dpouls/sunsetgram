import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "./../../redux/postReducer";
import axios from "axios";
import "./Notifications.scss";

const Notifications = props => {
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    axios.get("/api/posts").then(res => {
      props.getAllPosts(res.data);
      setPosts(res.data);
    });

    axios.get("/api/mynotifications").then(res => setNotifications(res.data));
  }, []);
  console.log("posts", posts, "notifications:", notifications);
  return (
    <div id='notification_page'>
      {notifications.sort((a, b) => b.notification_id - a.notification_id).map((n, i) => {
        return (
               <>      
              {n.is_like ? (
                 <div className="notificationContainer">  
            <img className="senderProfPic" src={n.profile_img} alt="profpic" />
            <div className='message'>
                <strong>{n.username}</strong>{' '}liked your photo.
                </div>
                  <img
                    className="postThumbnail"
                    src={n.image_url}
                    alt="thumb"
                  />
                </div>
              ) : n.is_comment ? (
                 <div className="notificationContainer">  
            <img className="senderProfPic" src={n.profile_img} alt="profpic" />

                    <div className='message'>
                    <strong>{n.username}</strong>{' '}commented:{' '}{n.contents}
                  
                     </div>
                   
                  <img
                    className="postThumbnail"
                    src={n.image_url}
                    alt="thumb"
                  />
                </div>
              ) : n.is_follow ? (
                 <div className="notificationContainer">
            <img className="senderProfPic" src={n.profile_img} alt="profpic" />


                    <div className='message'>
                      <strong>{n.username}</strong>{' '} started following you.
                     </div> 
                        <button>Follow</button>
                     
                  </div>
              ) : null}
            </>
        );
      })}
    </div>
  );
};
const mapStateToProps = state => {
  return { posts: state.postReducer.posts, loading: state.postReducer.loading };
};

export default connect(mapStateToProps, { getAllPosts })(Notifications);
