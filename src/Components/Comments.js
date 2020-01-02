import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import "../componentStyling/Comments.scss";

function Comments(props) {
  const deleteComment = () => {
    console.log(props);
    Axios.delete(
      `/api/deletecomment/${props.thisComment.comment_id}`
    ).then(res => props.getCommentsFn());
  };
  return (
    <div id='eachComment'>
      <p>
        <strong>{props.thisComment.username}</strong> {props.thisComment.contents}
      </p>
      {props.thisComment.id === props.userReducer.user.id ||
      props.thisPost.author_id === props.userReducer.user.id ? (
        <div>

            {props.commentMenu

            ? <div className='commentButtons' id='commentMenu'>
            
                <i className='commentButtons' class="far fa-edit"></i>
                <i onClick={() => deleteComment()} className='commentButtons' className="fas fa-eraser"></i>
                <i onClick={() => props.toggleCommentMenuFn()} class="fas fa-ellipsis-h"></i>
                </div>
                :
                <i onClick={() => props.toggleCommentMenuFn()} class="fas fa-ellipsis-h"></i>
            }
          

          
        </div>
      ) : null}
    </div>
  );
}
const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps)(Comments);
