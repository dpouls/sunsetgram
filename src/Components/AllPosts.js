import React, {Component} from 'react'
// import {render} from '@testing-library/react'
import '../App.css'
// import {useState} from 'react'
import Axios from 'axios';


class AllPosts extends Component {
    constructor(){
        super();
        this.state = {
    // post : {},
    likeCount: 0
        }
    }
    like = async (likes,post_id) => {
        this.setState({likeCount: this.state.likeCount + 1})
        likes = ++likes
        Axios.put(`/api/like/${post_id}`,{likes})
        .then(res =>  this.props.getPostsFn())
        
    }
    render(){
        return (
            <div>
            <img className='images' src={this.props.post.image_url} alt="sunset pic"/>
            <button onClick={()=> this.like(this.props.post.likes,this.props.post.post_id)}>♡</button>
            <p>{this.props.post.likes} Likes</p>
            <p>{this.props.post.caption}</p>
            </div>
        )
    }


}


export default AllPosts

