import React, { useState, useEffect } from "react";
import Axios from "axios";
import DiscoverImages from "./DiscoverImages";
import "./Discover.scss";

const Discover = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    Axios.get("/api/posts").then(res => {
      setPosts(res.data);
    });
  };
  return (
    <div id="discoverPageContainer">
      <div id="searchContainer">
        <div>
          <i id="searchGlass" className="fa fa-search"></i>
          <input placeholder="Search" id="searchBar" type="search" />
        </div>
      </div>

      <div className="gallery">
        {posts
          .sort((a, b) => b.post_id - a.post_id)
          .map((post, index) => (
            <DiscoverImages index={index} post={post} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Discover;
