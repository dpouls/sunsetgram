import React, {Component} from 'react'
import Axios from 'axios'
// import {connect} from 'react-redux'
// import Axios from 'axios'

class MyPosts extends Component {
    constructor(){
        super()
        this.state = {
            post: {}
        }
    }
    deletePost = () => {
        Axios.delete(`/api/delete/${this.props.post.post_id}`)
        .then(res => console.log(res.data))
        this.props.getMyPostsFn()
    }
    render(){
        return(
            <div>
            <div>
            <img className='images' src={this.props.post.image_url} alt="sunset pic"/>
            {/* <button onClick={()=> this.like(this.props.post.likes,this.props.post.post_id)}>♡</button> */}
            <p>{this.props.post.likes} Likes</p>
            <p>{this.props.post.caption}</p>
            <button onClick={this.deletePost}>x</button>
            </div>  
            </div>
        )
    }
}

export default MyPosts