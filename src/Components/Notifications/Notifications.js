import React, { useState,useEffect} from "react";
import { connect } from "react-redux";
import { getAllPosts } from "./../../redux/postReducer";
import axios from "axios";
import "./Notifications.scss";
import {withRouter} from 'react-router-dom'
import MappedNotifications from './MappedNotifications'

const Notifications = props => {
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);



  const getNotifications = () => {
    axios.get("/api/mynotifications").then(res => setNotifications(res.data));
  }
  useEffect(() => {
  getNotifications()

  },[])

  return (
    <div id='notification_page'>
      {notifications.sort((a, b) => b.notification_id - a.notification_id).map((n, i) => (
            <MappedNotifications key={i} thisNotification={n} />
      )
      )
      }
    </div>
  );
};
const mapStateToProps = state => {
  return { posts: state.postReducer.posts, loading: state.postReducer.loading };
};

export default withRouter(connect(mapStateToProps, { getAllPosts })(Notifications))
