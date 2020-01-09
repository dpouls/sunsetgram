import React, { Component } from "react";
import Axios from "axios";
import FollowingPosts from "./FollowingPosts";
import './FollowingFeed.scss'

class FollowingFeed extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount = () => {
    this.getPosts();
  };
  getPosts = () => {
    Axios.get("/api/followingposts").then(res => {
      this.setState({ posts: res.data });
      // console.log("getposts hit",this.state.posts[0].caption);
    });
  };

  render() {
    const { posts } = this.state;
    return (
      <div id='wholeFeedContainer'> 
        <div id="feedHeaderContainer">
          <div id="feedHeader">Sunny</div>
        </div>
        <div id='stories'>
           <p>FUTURE STORIES GO HERE</p> 
        </div>

        <div className="feedPostContainer">
          
          {
          posts.length > 0 ?
          
          posts.sort((a,b) => b.post_id - a.post_id).map((post, index) => (
            <FollowingPosts
              getPostsFn={this.getPosts}
              index={index}
              post={post}
              key={index}
            />
          ))
        :
        <span>You aren't following anyone!</span>
        }
        </div>
      </div>
    );
  }
}

export default FollowingFeed;
