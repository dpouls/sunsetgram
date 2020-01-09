import React, { Component } from "react";
import Axios from "axios";
import SpecificUserPosts from "./SpecificUserPosts";
import { connect } from "react-redux";
import "../profile/Profile.scss";
import "../profile/MyPosts.scss";

class SpecificUserProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      specificPosts: [],
      followers: [],
      following: [],
      followed: false
    };
  }
  async componentDidMount() {
    await this.getUserInfo();
    await this.getFollowers();
    this.getFollowing();
  }
  getUserInfo() {
    Axios.get(`/api/specificuserinfo/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err));
  }
  getFollowers = () => {
    Axios.get(`/api/getspecificfollowers/${this.props.match.params.id}`)
      .then(res =>
        this.setState({ followers: res.data }, () => {
          this.getFollowed();
        })
      )
      .catch(err => console.log(err));
  };
  getFollowing = () => {
    Axios.get(`/api/getspecificfollowing/${this.props.match.params.id}`)
      .then(res => this.setState({ following: res.data }))
      .catch(err => console.log(err));
  };
  getFollowed = () => {
    let filtered = this.state.followers.filter(el => {
      return el.follower_id === this.props.userReducer.user.id;
    });
    filtered.length > 0 && this.setState({ followed: true });
  };
  follow = () => {
    Axios.post("/api/follow", { followed_id: this.props.match.params.id }).then(
      res => {
        this.getFollowers();
        this.setState({ followed: true });
      }
    );
  };
  unfollow = () => {
    Axios.post("/api/unfollow", {
      followed_id: this.props.match.params.id
    }).then(res => {
      this.getFollowers();
      this.setState({ followed: false });
    });
  };

  render() {
    return (
      <div id="wholeProfile">
        <section id="profileHeader">
          <strong>{this.state.user[0] && this.state.user[0].username}</strong>
        </section>
        <section id="profPicUserStatsContainer">
          <img
            id="profilePic"
            src={this.state.user[0] && this.state.user[0].profile_img}
            alt="profile pic"
          />
          <section id="statsContainer">
            <section>
              <p>{this.state.user.length}</p>
              <p className="statsWords">Posts</p>
            </section>
            <section>
              <section onClick={() => this.getFollowers()}>
                {this.state.followers.length}
              </section>
              <p className="statsWords">Followers</p>
            </section>
            <section>
              <section>{this.state.following.length}</section>
              <p className="statsWords">Following</p>
            </section>
          </section>
        </section>
        <section id="followButtonContainer">
          {this.state.followed ? (
            <button onClick={() => this.unfollow()} id="unfollowButton">
              Unfollow
            </button>
          ) : (
            <button id="followButton" onClick={() => this.follow()}>
              Follow
            </button>
          )}
        </section>

        <section id="allMyPostsContainer">
          {this.state.user
            .sort((a, b) => b.post_id - a.post_id)
            .map((post, index) => (
              <SpecificUserPosts
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
export default connect(mapStateToProps)(SpecificUserProfile);
