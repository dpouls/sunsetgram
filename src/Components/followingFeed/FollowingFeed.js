import React, { Component } from "react";
import Axios from "axios";
import FollowingPosts from "./FollowingPosts";
import "./FollowingFeed.scss";

class FollowingFeed extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      myPosts: []
    };
  }

  componentDidMount(){
    this.getPosts();
    this.getMyPosts();
  };
  getPosts = async () => {
    await Axios.get("/api/followingposts").then(res => {
      this.setState({ posts: res.data });
    });
    // this.getMyPosts()
  };
  getMyPosts = () => {
    Axios.get(`/api/myposts`)
      .then(res => {
        this.setState({ myPosts: res.data });
      })
      .catch(err => console.log(err));
  };
  
  render() {
    console.log(this.state.posts)
    const { posts, myPosts } = this.state;
    const allPosts = [...posts, ...myPosts];
    return (
      <div id="wholeFeedContainer">
        <div id="feedHeaderContainer">
          <div id="feedHeader">Sunny</div>
        </div>
        {/* <div id="stories">
          <p>FUTURE STORIES GO HERE</p>
        </div> */}

        <div className="feedPostContainer">
          {allPosts.length > 0 ? (
            allPosts
              .sort((a, b) => b.post_id - a.post_id)
              .map((post, index) => (
                <FollowingPosts
                   getMyPostsFn={this.getMyPosts}
                  getPostsFn={this.getPosts}
                  index={index}
                  post={post}
                  key={index}
                />
              ))
          ) : (
            <span>You aren't following anyone!</span>
          )}
        </div>
      </div>
    );
  }
}

export default FollowingFeed;
