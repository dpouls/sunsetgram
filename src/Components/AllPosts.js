import React, {Component} from 'react'
// import {render} from '@testing-library/react'
import '../App.css'
// import {useState} from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'


class AllPosts extends Component {
    constructor(){
        super();
        this.state = {
    likers: null,
    likeCount: ''
        }
    }
    componentDidMount = () => {
        this.getLikes()
        

    }
    unlike = () => {
        console.log('unlike hit')
        Axios.delete(`/api/unlike/${this.props.post.post_id}`)
        .then(res => this.getLikes())
    }

    like =  (post_id) => {
        console.log('like hit')
        Axios.put(`/api/like/${this.props.post.post_id}`).then(res => this.getLikes())
    }
    likeHandler = async () => {
        await this.getLikers()
        const likers = this.state.likers 
        const filtered = likers.filter((el) => {
            return el.user_id ===  this.props.userReducer.user.id
        })
        if (filtered.length > 0) {
            this.unlike()
        } else {
            this.like()
        }
    }
    getLikers = async () => {
        await Axios.get(`/api/likers/${this.props.post.post_id}`)
        .then(res => {
            console.log('t',res.data)
            this.setState({likers: res.data})
        }
        )
        console.log('getlikers return', this.state.likers)
    }
    
    getLikes = () => {
        Axios.get(`/api/likecount/${this.props.post.post_id}`)
        .then(res => this.setState({
            likeCount: res.data[0].count
        }))
    }
    render(){
       console.log('user_id from props:',this.props.userReducer.user.id)
    //    console.log('this.props.' ,this.props)

    console.log('likers',this.state.likers)
        return (
            <div>
            <img className='images' src={this.props.post.image_url} alt="sunset pic"/>
            <button onClick={()=> this.likeHandler()}>♡</button>
            <p>{this.state.likeCount} Likes</p>
            <p>{this.props.post.caption}</p>
            </div>
        )
    }


}

const mapStateToProps = (reduxState) => {
    return reduxState 
}
export default connect(mapStateToProps)(AllPosts)

