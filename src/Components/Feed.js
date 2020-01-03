import React, { Component } from "react";
import Axios from "axios";
import AllPosts from "./AllPosts";
import './../componentStyling/Feed.scss'

class Feed extends Component {
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
    Axios.get("/api/posts").then(res => {
      this.setState({ posts: res.data });
      console.log("getposts hit",this.state.posts[0].caption);
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
          {posts.map((post, index) => (
            <AllPosts
              getPostsFn={this.getPosts}
              index={index}
              post={post}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Feed;
