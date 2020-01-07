import React, { useState, useEffect } from "react";
import Axios from "axios";
import DiscoverImages from "./DiscoverImages";
import './Discover.scss'
import { connect } from "react-redux";
import { getAllPosts } from "./../../redux/postReducer";

const Discover = () => {
    const [posts, setPosts] = useState([])
    useEffect( () => {
        getPosts()
    },[])



//   componentDidMount = () => {
//     this.getPosts();
//   };
const getPosts = () => {
    Axios.get("/api/posts").then(res => {
        setPosts(res.data);
    });
  };
    return (
      <div id='discoverPageContainer'> 
        <div id="DiscoverHeaderContainer">
          <div id='searchBar'>Search Bar</div>
        </div>

        <div className="gallery">
          {posts.sort((a,b) => b.post_id - a.post_id).map((post, index) => (
            <DiscoverImages
            //   getPostsFn={getPosts}
              index={index}
              post={post}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }


export default Discover;