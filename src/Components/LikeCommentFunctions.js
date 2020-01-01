import React from 'react'
import '../App.css'
import Axios from 'axios';
import {connect} from 'react-redux'
import Comments from './Comments'

   export const didMount = function componentDidMount(async){
        this.getLikes()
        await this.getLikers()
       this.colorHearts()
       this.getAllComments()
       

   }
   const unlike = () => {
       console.log('unlike hit')
       Axios.delete(`/api/unlike/${this.props.post.post_id}`)
       .then(res => this.getLikes())
       this.setState({likedHeart: false})
   }

   const like =  (post_id) => {
       console.log('like hit')
       Axios.put(`/api/like/${this.props.post.post_id}`).then(res => this.getLikes())
       this.setState({likedHeart: true})
   }
   const likeHandler = async () => {
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
 const  getLikers = async () => {
       await Axios.get(`/api/likers/${this.props.post.post_id}`)
       .then(res => {
           this.setState({likers: res.data})
       }
       )
   }
  const colorHearts = () => {
      let filtered = this.state.likers.filter((el) => {
           return el.user_id ===  this.props.userReducer.user.id
       })
       if (filtered.length > 0) {
           this.setState({likedHeart: true})
       }
   }
  const getLikes = () => {
       Axios.get(`/api/likecount/${this.props.post.post_id}`)
       .then(res => this.setState({
           likeCount: res.data[0].count
       }))
   }

  const getAllComments = () => {
       Axios.get(`/api/comments/${this.props.post.post_id}`)
       .then(res => this.setState({comments: res.data}))
       .catch(err => console.log('Error getting comments.',err))
   }

   const inputHandler = (e) => this.setState({[e.target.name] : e.target.value}),
   addComment = () => {
       Axios.post(`/api/addcomment/${this.props.post.post_id}`,{content: this.state.content})
       .then(res => this.getAllComments())
       .catch(err => console.log(err))
       this.setState({content: ''})
   }
 export const hello = () => {
       console.log('hello')
   }
   