import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import Comments from "./Comments";
import "./../componentStyling/AllPosts.scss";

class AllPosts extends Component {
  constructor() {
    super();
    this.state = {
      likers: [],
      likeCount: "",
      likedHeart: false,
      viewComments: false,
      addComment: false,
      comments: [],
      content: "",
      caption: "",
      commentMenu: false,
      postMenu: false
    };
  }
  editPost = async () => {
    await Axios.put(`/api/editpost/${this.props.post.post_id}`, {
      caption: this.state.caption
    })
      .then(res => console.log("res", res))
      .catch(err => console.log(err));
    this.props.getPostsFn();
    this.setState({ caption: "" });
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.post.caption !== prevProps.post.caption) {
      this.props.getPostsFn();
    }
    console.log("cdu hit");
  };
  componentDidMount = async () => {
    // this.getLikes();
    await this.getLikers();
    this.colorHearts();
    this.getAllComments();
  };
  unlike = () => {
    console.log("unlike hit");
    Axios.delete(`/api/unlike/${this.props.post.post_id}`).then(res =>
      this.getLikers()
    );
    this.setState({ likedHeart: false });
  };

  like = post_id => {
    console.log("like hit");
    Axios.post(`/api/like/${this.props.post.post_id}`).then(res =>
      this.getLikers()
    );
    this.setState({ likedHeart: true });
  };
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
  getLikers = async () => {
    await Axios.get(`/api/likers/${this.props.post.post_id}`).then(res => {
      this.setState({ likers: res.data });
    });
  };
  colorHearts = () => {
    let filtered = this.state.likers.filter(el => {
      return el.user_id === this.props.userReducer.user.id;
    });
    if (filtered.length > 0) {
      this.setState({ likedHeart: true });
    }
  };
  //   getLikes = () => {
  //     Axios.get(`/api/likecount/${this.props.post.post_id}`).then(res =>
  //       this.setState({
  //         likeCount: res.data[0].count
  //       })
  //     );
  //   };

  getAllComments = () => {
    Axios.get(`/api/comments/${this.props.post.post_id}`)
      .then(res => this.setState({ comments: res.data }))
      .catch(err => console.log("Error getting comments.", err));
  };
  toggleAddComment = () => {
    this.setState({ addComment: !this.state.addComment });
  };
  toggleViewComments = () => {
    this.setState({ viewComments: !this.state.viewComments });
  };
  toggleCommentMenu = () => {
    this.setState({ commentMenu: !this.state.commentMenu });
  };

  inputHandler = e => this.setState({ [e.target.name]: e.target.value });
  addComment = () => {
    Axios.post(`/api/addcomment/${this.props.post.post_id}`, {
      content: this.state.content
    })
      .then(res => this.getAllComments())
      .catch(err => console.log(err));
    this.setState({ content: "", addComment: false, viewComments: true });
  };

  render() {
    const { comments, content } = this.state;
    console.log("component did update");
    return (
      <div id="wholePostContainer">
        {/* post header and image */}

        <div className="postHeader">
          <div className="postHeaderUserInfoContainer">
            <img
              className="postHeaderPic"
              src="https://robohash.org/rob?set=set5"
              alt=""
            />
            <p>{this.props.post.username}</p>
          </div>
          <i class="fas fa-ellipsis-h"></i>
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
                class="fas fa-heart"
              ></i>
            ) : (
              <i
                id="unlikedHeart"
                onClick={() => this.likeHandler()}
                class="far fa-heart"
              ></i>
            )}

            <i
              onClick={() => this.toggleAddComment()}
              id="commentIcon"
              className="far fa-comment"
            ></i>
            <i className="far fa-paper-plane"></i>
          </section>
          <i class="far fa-bookmark"></i>
          {/* <i class="fas fa-bookmark"></i> */}
        </section>

        {/* shows how many likes  */}
        {/* <section id='likeDisplay'>
            {this.state.likeCount < 1 ? null : +this.state.likeCount === 1 ? (
          <p>{this.state.likeCount} Like</p>
        ) : (
          <p>{this.state.likeCount} Likes</p>
        )}
        </section> */}
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
            {this.props.post.caption}
          </p>
        </section>

        {this.state.viewComments ? (
          <div id="allCommentsContainer">
            {comments.map((comment, index) => {
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
              id="addCommentInput"
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


{/* IMPORTANT EDIT FUNCTIONALITY DO NOT ERASE! */}



        {/* {this.props.post.id === this.props.userReducer.user.id ? (
          <div>
            {" "}
            <input
              name="caption"
              placeholder="edit caption here..."
              value={this.state.caption}
              onChange={e => this.inputHandler(e)}
              type="text"
            />
            <button onClick={() => this.editPost()}>Submit Edit</button>
            <button onClick={this.deletePost}>Delete Post</button>
          </div>
        ) : null} */}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};
export default connect(mapStateToProps)(AllPosts);
