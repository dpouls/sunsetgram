import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import Comments from "../comments/Comments";
import "./SpecificUserPosts.scss";
class SpecificUserPosts extends Component {
  constructor() {
    super();
    this.state = {
      post: {},
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
      editPost: false,
      newCommentId: 0
    };
  }

  deletePost = () => {
    Axios.delete(`/api/delete/${this.props.post.post_id}`).then(res =>
      this.props.getMyPostsFn()
    );
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.post.caption !== prevProps.post.caption) {
      this.props.getMyPostsFn();
    }
    // console.log("cdu hit");
  };
  componentDidMount = async () => {
    await this.getLikers();
    this.colorHearts();
    this.getAllComments();
  };

  // LIKES FUNCTIONS

  //gets an array of the users that have liked this post
  getLikers = async () => {
    await Axios.get(`/api/likers/${this.props.post.post_id}`).then(res => {
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
  like = async () => {
    await Axios.post(`/api/like/${this.props.post.post_id}`).then(res => this.getLikers()
    ).then(
      this.setState({ likedHeart: true })
    )
    .catch(err => console.log(err))
    this.likeNotification()

  };
  unlike = () => {
    Axios.delete(`/api/unlike/${this.props.post.post_id}`).then(res =>
      this.getLikers()
    );
    this.setState({ likedHeart: false });
  };
  likeNotification = () => {
    const {post} = this.props
    Axios.post('/api/addnotification/', {receiver_id: post.author_id, post_id: post.post_id, is_comment: false, is_like: true, is_follow: false, comment_id: 155})
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }
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
    Axios.get(`/api/comments/${this.props.post.post_id}`)
      .then(res => this.setState({ comments: res.data }))
      .catch(err => console.log("Error getting comments.", err));
  };

  addComment = async () => {
    const {post} = this.props
    await Axios.post(`/api/addcomment/${post.post_id}`, {
      content: this.state.content
    })
      .then(res => this.setState({newCommentId: res.data[0].comment_id}))
      .then(res => this.getAllComments())
      .catch(err => console.log(err));
      this.setState({ content: "", addComment: false, viewComments: true })
      
      Axios.post('/api/addnotification/', {receiver_id: post.author_id, post_id: post.post_id, is_comment: true, is_like: false, is_follow: false,comment_id: this.state.newCommentId})
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
      
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

  render() {
    const { comments, content } = this.state;
    return (
      <div id="wholePostContainer">
        {/* post header and image */}

        <div className="postHeader">
          <div className="postHeaderUserInfoContainer">
            <img
              className="postHeaderPic"
              src={this.props.post.profile_img}
              alt=""
            />
            <p>{this.props.post.username}</p>
          </div>
        </div>

        <img
          className="images"
          src={this.props.post.image_url}
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
          <p id="caption">
            <strong>{this.props.post.username}</strong>{" "}
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
              this.props.post.caption
            )}
          </p>
        </section>

        {this.state.viewComments ? (
          <div id="allCommentsContainer">
            {comments
              .sort((a, b) => a.comment_id - b.comment_id)
              .map((comment, index) => {
                return (
                  <Comments
                    toggleCommentMenuFn={this.toggleCommentMenu}
                    commentMenu={this.state.commentMenu}
                    thisPost={this.props.post}
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
export default connect(mapStateToProps)(SpecificUserPosts);
