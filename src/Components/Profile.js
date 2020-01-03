import React, { Component } from "react";
import Axios from "axios";
import { logout } from "../redux/userReducer";
import { connect } from "react-redux";
import MyPosts from "./MyPosts";
import "./../componentStyling/Profile.scss";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      myPosts: []
    };
  }
  componentDidMount = () => {
    this.getMyPosts();
  };
  getMyPosts = () => {
    Axios.get(`/api/myposts`)
      .then(res => {
        this.setState({ myPosts: res.data });
      })
      .catch(err => console.log(err));
  };
  logout = () => {
    Axios.post("/auth/logout")
      .then(res => {
        this.props.logout();
        this.props.history.push("/");
      })
      .catch(err => console.log("logout err", err));
  };
  render() {
    return (
      <div id='wholeProfile'>
         

         
        <section id="profileHeader">
          <strong>{this.props.userReducer.user.username}</strong>{" "}
          <i onClick={this.logout}className="fas fa-sign-out-alt"></i>
        </section>
        <section id="profPicUserStatsContainer">
          <img id="profilePic" src={`https://robohash.org/${this.props.userReducer.user.id}?set=set5`} alt="profile pic" />
          <section id="statsContainer">
            
            {/* <p>{this.state.myPosts.length} Posts</p> */}
            <section><p>{this.state.myPosts.length}</p><p className='statsWords'>Posts</p></section>
            <section><p>900</p><p className='statsWords'>Followers</p></section>
            <section><p>800</p><p className='statsWords'>Following</p></section>
            
          </section>
        </section>
        <section id='editProfileButtonContainer'>
        <button id='editProfileButton'>Edit Profile</button>
        </section>



        <section id="allMyPostsContainer">
          {this.state.myPosts.map((post, index) => (
            <MyPosts
              getMyPostsFn={this.getMyPosts}
              index={index}
              post={post}
              key={index}
            />
          ))}
        </section>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};
export default connect(mapStateToProps, { logout })(Profile);
