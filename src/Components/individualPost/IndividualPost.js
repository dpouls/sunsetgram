import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import Comments from "../comments/Comments";
import "../feed/AllPosts.scss";
import {withRouter} from 'react-router-dom'

class IndividualPost extends Component {
  constructor() {
    super();
    this.state = {
        thisPost: {},
      likers: [],
      likeCount: "",
      likedHeart: false,
      viewComments: false,
      addComment: false,
      comments: [],
      content: "",
      caption: "",
      commentMenu: false,
      postMenu: false,
      editPost: false
    };
  }
  componentDidMount = async () => {
    this.getPost()
    await this.getLikers();
    this.colorHearts();
    this.getAllComments();
  };
  getPost = async() => {
      await Axios.get(`/api/post/${this.props.match.params.post_id}`)
      .then(res =>  this.setState({thisPost: res.data}
      ))
      .catch(err => console.log(err))
  }

  editPost = async () => {
    await Axios.put(`/api/editpost/${this.state.thisPost.post_id}`, {
      caption: this.state.caption
    })
      .then(res => this.getPost())
      .catch(err => console.log(err));
    this.setState({ caption: "" });
    this.toggleEditPost();
  };
  deletePost = () => {
    Axios.delete(`/api/delete/${this.state.thisPost.post_id}`).then(res =>
      this.props.history.push('/following')
    );
  };

  // LIKES FUNCTIONS

    //gets an array of the users that have liked this post
  getLikers = async () => {
    await Axios.get(`/api/likers/${this.props.match.params.post_id}`).then(res => {
      this.setState({ likers: res.data });
    });
  };

  //determines if user has liked the post and whether to like or unlike the picture if the button is pressed again
  likeHandler = async () => {
    await this.getLikers();
    const likers = this.state.likers;
    const filtered = likers.filter(el => {
      return el.user_id === this.props.userReducer.user.id;
    });
    if (filtered.length > 0) {
      this.unlike();
    } else {
      this.like();
    }
  };  
  like = post_id => {
    Axios.post(`/api/like/${this.state.thisPost.post_id}`).then(res =>
      this.getLikers()
    );
    this.setState({ likedHeart: true });
  };
  unlike = () => {
    Axios.delete(`/api/unlike/${this.state.thisPost.post_id}`).then(res =>
      this.getLikers()
    );
    this.setState({ likedHeart: false });
  };


    // colors hearts red if the user has already liked it
  colorHearts = () => {
    let filtered = this.state.likers.filter(el => {
      return el.user_id === this.props.userReducer.user.id;
    });
    if (filtered.length > 0) {
      this.setState({ likedHeart: true });
    }
  };

  // COMMENT FUNCTIONS

  inputHandler = e => this.setState({ [e.target.name]: e.target.value });


  getAllComments = () => {
    Axios.get(`/api/comments/${this.state.thisPost.post_id}`)
      .then(res => this.setState({ comments: res.data }))
      .catch(err => console.log("Error getting comments.", err));
  };


  addComment = () => {
    Axios.post(`/api/addcomment/${this.state.thisPost.post_id}`, {
      content: this.state.content
    })
      .then(res => this.getAllComments())
      .catch(err => console.log(err));
    this.setState({ content: "", addComment: false, viewComments: true });
  };


  // TOGGLES FOR RENDERING 

  toggleAddComment = () => {
    this.setState({ addComment: !this.state.addComment });
  };
  toggleViewComments = () => {
    this.setState({ viewComments: !this.state.viewComments });
  };
  toggleCommentMenu = () => {
    this.setState({ commentMenu: !this.state.commentMenu });
  };
  togglePostMenu = () => {
    this.setState({ postMenu: !this.state.postMenu });
  };
  toggleEditPost = () => {
    this.setState({ editPost: !this.state.editPost });
  };

  goToProfile = () => {
    this.props.history.push(`/specificprofile/${this.state.thisPost.id}`)
  }


  render() {
    const {thisPost,comments, content } = this.state;

    return (
        <div id="wholePostContainer">
        {/* post header and image */}

        <div className="postHeader">
          <div onClick={() => {this.goToProfile()}} className="postHeaderUserInfoContainer">
            <img
              className="postHeaderPic"
              src={thisPost.profile_img}
              alt=""
            />
            <p>{thisPost.username}</p>
          </div>

          {thisPost.id === this.props.userReducer.user.id ? (
            this.state.postMenu ? (
              <div className="postMenu">
                <i
                  onClick={() => this.toggleEditPost()}
                  className="postMenuButtons"
                  className="far fa-edit"
                ></i>
                <i
                  onClick={() => this.deletePost()}
                  className="postMenuButtons"
                  className="fas fa-eraser"
                ></i>
                <i
                  onClick={() => this.togglePostMenu()}
                  className="postMenuButtons"
                  className="fas fa-ellipsis-h"
                ></i>
              </div>
            ) : (
              <i
                onClick={() => this.togglePostMenu()}
                className="fas fa-ellipsis-h"
              ></i>
            )
          ) : null}
        </div>
        
        <img
          className="images"
          src={thisPost.image_url}
          alt="sunset pic"
        />

        {/* like comment send and save buttons  */}

        <section className="likeCommentSendSaveContainer">
          <section>
            {this.state.likedHeart ? (
              <i
                id="likedHeart"
                onClick={() => this.likeHandler()}
                className="fas fa-heart"
              ></i>
            ) : (
              <i
                id="unlikedHeart"
                onClick={() => this.likeHandler()}
                className="far fa-heart"
              ></i>
            )}

            <i
              onClick={() => this.toggleAddComment()}
              id="commentIcon"
              className="far fa-comment"
            ></i>
            <i className="far fa-paper-plane"></i>
          </section>
          <i className="far fa-bookmark"></i>
          {/* <i class="fas fa-bookmark"></i> */}
        </section>

        {/* shows how many likes  */}
       
        <section id="likeDisplay">
          {this.state.likers.length < 1 ? null : +this.state.likers.length ===
            1 ? (
            <p>{this.state.likers.length} Like</p>
          ) : (
            <p>{this.state.likers.length} Likes</p>
          )}
        </section>

        {/* Caption container */}

        <section id="captionContainer">
          <section id="caption">
            <strong onClick={() => {this.goToProfile()}}>{thisPost.username}</strong>{" "}
            {this.state.editPost ? (
              <div>
                {" "}
                <input
                  className="addCommentInput"
                  name="caption"
                  placeholder="Edit caption here..."
                  value={this.state.caption}
                  onChange={e => this.inputHandler(e)}
                  type="text"
                />
                <span id="captionEditSubmit" onClick={() => this.editPost()}>
                  Post
                </span>
              </div>
            ) : (
              thisPost.caption
            )}
          </section>
        </section>

        {this.state.viewComments ? (
          <div id="allCommentsContainer">
            {comments.sort((a,b) => a.comment_id - b.comment_id).map((comment, index) => {
              return (
                <Comments
                  toggleCommentMenuFn={this.toggleCommentMenu}
                  commentMenu={this.state.commentMenu}
                  thisPost={thisPost}
                  getCommentsFn={this.getAllComments}
                  thisComment={comment}
                  author_id={comment.author_id}
                  key={comment.comment_id}
                />
              );
            })}
          </div>
        ) : this.state.comments.length > 0 ? (
          <section onClick={() => this.toggleViewComments()} id="viewComments">
            View all {this.state.comments.length} comments
          </section>
        ) : null}

        {this.state.addComment ? (
          <div id="addCommentContainer">
            <input
              className="addCommentInput"
              placeholder="Add a comment..."
              type="text"
              name="content"
              value={content}
              onChange={e => this.inputHandler(e)}
            />
            <section id="addCommentButton" onClick={() => this.addComment()}>
              Post
            </section>
          </div>
        ) : null}

      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};
export default withRouter(connect(mapStateToProps)(IndividualPost));
