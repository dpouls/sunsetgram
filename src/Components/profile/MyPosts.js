import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
// import {connect} from 'react-redux'
// import Axios from 'axios'
import Comments from "../comments/Comments";
import "./MyPosts.scss";
class MyPosts extends Component {
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
      editPost: false
    };
  }
//   editPost = () => {
//     // const {caption} = this.state
//     console.log(this.state.caption);
//     Axios.put(`/api/editpost/${this.props.post.post_id}`, {
//       caption: this.state.caption
//     })

//       .then(res => console.log("edit response", res))
//       .catch(err => console.log(err));
//   };

//   deletePost = () => {
//     Axios.delete(`/api/delete/${this.props.post.post_id}`).then(res =>
//       this.props.getMyPostsFn()
//     );
//   };

//   componentDidMount = async () => {
//     console.log("props", this.props);
//     // this.getLikes()
//     await this.getLikers();
//     this.colorHearts();
//     this.getAllComments();
//   };
//   unlike = () => {
//     console.log("unlike hit");
//     Axios.delete(`/api/unlike/${this.props.post.post_id}`).then(res =>
//       this.getLikers()
//     );
//     this.setState({ likedHeart: false });
//   };

//   like = post_id => {
//     console.log("like hit");
//     Axios.post(`/api/like/${this.props.post.post_id}`).then(res =>
//       this.getLikers()
//     );
//     this.setState({ likedHeart: true });
//   };
//   likeHandler = async () => {
//     await this.getLikers();
//     const likers = this.state.likers;
//     const filtered = likers.filter(el => {
//       return el.user_id === this.props.userReducer.user.id;
//     });
//     if (filtered.length > 0) {
//       this.unlike();
//     } else {
//       this.like();
//     }
//   };
//   getLikers = async () => {
//     await Axios.get(`/api/likers/${this.props.post.post_id}`).then(res => {
//       this.setState({ likers: res.data });
//     });
//   };
//   colorHearts = () => {
//     let filtered = this.state.likers.filter(el => {
//       return el.user_id === this.props.userReducer.user.id;
//     });
//     if (filtered.length > 0) {
//       this.setState({ likedHeart: true });
//     }
//   };


//   getAllComments = () => {
//     Axios.get(`/api/comments/${this.props.post.post_id}`)
//       .then(res => this.setState({ comments: res.data }))
//       .catch(err => console.log("Error getting comments.", err));
//   };

//   inputHandler = e => this.setState({ [e.target.name]: e.target.value });
//   addComment = () => {
//     Axios.post(`/api/addcomment/${this.props.post.post_id}`, {
//       content: this.state.content
//     })
//       .then(res => this.getAllComments())
//       .catch(err => console.log(err));
//     this.setState({ content: "" });
//   };
editPost = async () => {
    await Axios.put(`/api/editpost/${this.props.post.post_id}`, {
      caption: this.state.caption
    })
      .then(res => this.props.getMyPostsFn())
      .catch(err => console.log(err));
    this.setState({ caption: "" });
    this.toggleEditPost();
  };
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
  like = post_id => {
    console.log("like hit");
    Axios.post(`/api/like/${this.props.post.post_id}`).then(res =>
      this.getLikers()
    );
    this.setState({ likedHeart: true });
  };
  unlike = () => {
    console.log("unlike hit");
    Axios.delete(`/api/unlike/${this.props.post.post_id}`).then(res =>
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
    Axios.get(`/api/comments/${this.props.post.post_id}`)
      .then(res => this.setState({ comments: res.data }))
      .catch(err => console.log("Error getting comments.", err));
  };


  addComment = () => {
    Axios.post(`/api/addcomment/${this.props.post.post_id}`, {
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

  render() {
    const { comments, content } = this.state;
    return (
        <div id="wholePostContainer">
        {/* post header and image */}

        <div className="postHeader">
          <div className="postHeaderUserInfoContainer">
            <img
              className="postHeaderPic"
              src={this.props.userReducer.user.profile_img}
              alt=""
            />
            <p>{this.props.post.username}</p>
          </div>

          {this.props.post.id === this.props.userReducer.user.id ? (
            this.state.postMenu ? (
              <div className="postMenu">
                <i
                  onClick={() => this.toggleEditPost()}
                  className="postMenuButtons"
                  class="far fa-edit"
                ></i>
                <i
                  onClick={() => this.deletePost()}
                  className="postMenuButtons"
                  class="fas fa-eraser"
                ></i>
                <i
                  onClick={() => this.togglePostMenu()}
                  className="postMenuButtons"
                  class="fas fa-ellipsis-h"
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
            {comments.sort((a,b) => b.comment_id - a.comment_id).map((comment, index) => {
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

        {/* IMPORTANT EDIT FUNCTIONALITY DO NOT ERASE! */}
      </div>
    //   <div id="eachWholePostContainer">
    //     <img
    //       className="myImages"
    //       src={this.props.post.image_url}
    //       alt="sunset pic"
    //     />
    //     <button
    //       className={this.state.likedHeart ? "likedHeart" : null}
    //       onClick={() => this.likeHandler()}
    //     >
    //       ♡
    //     </button>
    //     {this.state.likers.length < 1 ? null : +this.state.likers.length ===
    //       1 ? (
    //       <p>{this.state.likers.length} Like</p>
    //     ) : (
    //       <p>{this.state.likers.length} Likes</p>
    //     )}
    //     <p>{this.props.post.caption}</p>
    //     <input
    //       name="caption"
    //       placeholder="edit caption here..."
    //       value={this.state.caption}
    //       onChange={e => this.inputHandler(e)}
    //       type="text"
    //     />

    //     <button onClick={() => this.editPost()}>Submit Edit</button>
    //     <button onClick={this.deletePost}>Delete Post</button>
    //     {comments.map((comment, index) => {
    //       return (
    //         <Comments
    //           thisPost={this.props.post}
    //           getCommentsFn={this.getAllComments}
    //           thisComment={comment}
    //           author_id={comment.author_id}
    //           key={comment.comment_id}
    //         />
    //       );
    //     })}

    //     <div>
    //       <input
    //         type="text"
    //         name="content"
    //         value={content}
    //         onChange={e => this.inputHandler(e)}
    //       />
    //       <button onClick={() => this.addComment()}>Add comment!</button>
    //     </div>
    //   </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};
export default connect(mapStateToProps)(MyPosts);
