import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import "./Comments.scss";

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      editComment: false,
      content: ""
    };
  }
  editComment = () => {
    Axios.put(`/api/editcomment/${this.props.thisComment.comment_id}`, {
      content: this.state.content
    })
      .then(res => this.props.getCommentsFn())
      .catch(err => console.log(err));
    this.setState({ editComment: false, content: "" });
  };

  inputHandler = e => this.setState({ [e.target.name]: e.target.value });
  toggleEditComment = () =>
    this.setState({ editComment: !this.state.editComment });

  deleteComment = () => {
    Axios.delete(
      `/api/deletecomment/${this.props.thisComment.comment_id}`
    ).then(res => this.props.getCommentsFn());
  };
  render() {
    return (
      <div id="eachComment">
        <p>
          <strong>{this.props.thisComment.username}</strong>{" "}
          {this.state.editComment ? (
            <div id="editCommentInputButtonContainer">
              <input
                onChange={e => this.inputHandler(e)}
                type="text"
                placeholder="Insert new comment here..."
                name="content"
                value={this.state.content}
                className="addCommentInput"
              />
              <span onClick={() => this.editComment()} id="editCommentSubmit">
                Post
              </span>
            </div>
          ) : (
            this.props.thisComment.contents
          )}
        </p>
        {this.props.thisComment.id === this.props.userReducer.user.id ||
        this.props.thisPost.author_id === this.props.userReducer.user.id ? (
          <div>
            {this.props.commentMenu ? (
              <div className="commentButtons" id="commentMenu">
                <i
                  className="commentButtons"
                  onClick={() => this.toggleEditComment()}
                  class="far fa-edit"
                ></i>
                <i
                  onClick={() => this.deleteComment()}
                  className="commentButtons"
                  class="fas fa-eraser"
                ></i>
                <i
                  onClick={() => this.props.toggleCommentMenuFn()}
                  class="fas fa-ellipsis-h"
                ></i>
              </div>
            ) : (
              <i
                onClick={() => this.props.toggleCommentMenuFn()}
                className="fas fa-ellipsis-h"
              ></i>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps)(Comments);
