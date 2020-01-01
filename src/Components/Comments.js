import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'

function Comments(props) {
    const deleteComment = () => {
        console.log(props)
          Axios.delete(`/api/deletecomment/${props.thisComment.comment_id}`)
          .then(res => props.getCommentsFn())
      }
    return (
        <div>
            <p>@{props.thisComment.username}</p>
            <p>{props.thisComment.contents}</p>
            {props.thisComment.id === props.userReducer.user.id || props.thisPost.author_id === props.userReducer.user.id  ? <div><button onClick={()=>deleteComment()}>x</button></div> : null }
            
        </div>
    )
}
const mapStateToProps = (reduxState) => {
    return reduxState 
}

export default connect(mapStateToProps)(Comments)
