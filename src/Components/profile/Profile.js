import React, { Component } from "react";
import Axios from "axios";
import { logout } from "../../redux/userReducer";
import { connect } from "react-redux";
import EditProfile from './editProfile/EditProfile'
import MyPosts from "./MyPosts";
import "./Profile.scss";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      myPosts: [],
      followers: [],
      following: []
    };
  }
  componentDidMount(){
    this.getMyPosts();
    this.getFollowers();
    this.getFollowing();

   
  };
  getFollowers = () => {
    Axios.get('/api/getfollowers',{id: this.props.userReducer.user.id})
    .then( res => this.setState({followers: res.data}))
    .catch(err => console.log(err))
  }
  getFollowing= () => {
    Axios.get('/api/getfollowing',{id: this.props.userReducer.user.id})
    .then( res => this.setState({following: res.data}))
    .catch(err => console.log(err))
  }

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
          <img id="profilePic" src={this.props.userReducer.user.profile_img} alt="profile pic" />
          <section id="statsContainer">
            
            {/* <p>{this.state.myPosts.length} Posts</p> */}
            <section><p>{this.state.myPosts.length}</p><p className='statsWords'>Posts</p></section>
            <section><section>{this.state.followers.length}</section><p className='statsWords'>Followers</p></section>
            <section><section>{this.state.following.length}</section><p className='statsWords'>Following</p></section>
            
          </section>
        </section>
        <section id='editProfileButtonContainer'>
        <button id='editProfileButton'>Edit Profile</button>
        </section>
        <div>
          <EditProfile />
        </div>



        <section id="allMyPostsContainer">
          {this.state.myPosts.sort((a, b) => b.post_id - a.post_id).map((post, index) => (
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
