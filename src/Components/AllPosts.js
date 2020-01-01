import React, {Component} from 'react'
import '../App.css'
import Axios from 'axios';
import {connect} from 'react-redux'
import Comments from './Comments'



class AllPosts extends Component {
    constructor(){
        super();
        this.state = {
    likers: null,
    likeCount: '',
    likedHeart: false,
    comments: [],
    content:'',
    caption:''
        }
    }
    editPost = async() => {
        await Axios.put(`/api/editpost/${this.props.post.post_id}`, {caption: this.state.caption})
        .then(res => console.log('res',res))
        .catch(err => console.log(err))
        this.props.getPostsFn()
        this.setState({caption: ''})
        
    }
    componentDidUpdate = (prevProps,prevState) => {
        if(this.props.post.caption !== prevProps.post.caption){
            this.props.getPostsFn()
        }
        console.log('cdu hit')
    }
    componentDidMount = async () => {
         this.getLikes()
         await this.getLikers()
        this.colorHearts()
        this.getAllComments()
        

    }
    unlike = () => {
        console.log('unlike hit')
        Axios.delete(`/api/unlike/${this.props.post.post_id}`)
        .then(res => this.getLikes())
        this.setState({likedHeart: false})
    }

    like =  (post_id) => {
        console.log('like hit')
        Axios.post(`/api/like/${this.props.post.post_id}`).then(res => this.getLikes())
        this.setState({likedHeart: true})
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
            this.setState({likers: res.data})
        }
        )
    }
    colorHearts = () => {
       let filtered = this.state.likers.filter((el) => {
            return el.user_id ===  this.props.userReducer.user.id
        })
        if (filtered.length > 0) {
            this.setState({likedHeart: true})
        }
    }
    getLikes = () => {
        Axios.get(`/api/likecount/${this.props.post.post_id}`)
        .then(res => this.setState({
            likeCount: res.data[0].count
        }))
    }

    getAllComments = () => {
        Axios.get(`/api/comments/${this.props.post.post_id}`)
        .then(res => this.setState({comments: res.data}))
        .catch(err => console.log('Error getting comments.',err))
    }

    inputHandler = (e) => this.setState({[e.target.name] : e.target.value})
    addComment = () => {
        Axios.post(`/api/addcomment/${this.props.post.post_id}`,{content: this.state.content})
        .then(res => this.getAllComments())
        .catch(err => console.log(err))
        this.setState({content: ''})
    }
    
    
    

    render(){
    const {comments,content} = this.state
    console.log('component did update')
        return (
            <div>
            <p>@{this.props.post.username}</p>
            <img className='images' src={this.props.post.image_url} alt="sunset pic"/>
            <button className={this.state.likedHeart ? 'likedHeart': null} onClick={()=> this.likeHandler()}>♡</button>

            {this.state.likeCount < 1 
                ? null 
                : +this.state.likeCount === 1 
                    ? <p>{this.state.likeCount} Like</p> 
                    : <p>{this.state.likeCount} Likes</p>}
            <p>{this.props.post.caption}</p>


            {this.props.post.id === this.props.userReducer.user.id 
                ? <div> <input 
            name='caption' 
            placeholder='edit caption here...' 
            value={this.state.caption} 
            onChange={(e) => this.inputHandler(e)} 
            type="text"/>

            <button onClick={() => this.editPost()}>Submit Edit</button>
            <button onClick={this.deletePost}>Delete Post</button></div>
            : 
            null
            } 




            
           <div>
                {comments.map((comment,index)=> {
                   return <Comments thisPost={this.props.post} getCommentsFn={this.getAllComments} thisComment={comment} author_id={comment.author_id} key={comment.comment_id}/>
                })}
            </div>
            <div>
                <input 
                type="text"
                name='content'
                value={content}
                onChange={(e)=> this.inputHandler(e)}/>
                <button onClick={()=> this.addComment()}>Add comment!</button>
            </div>
            </div>
        )
    }


}

const mapStateToProps = (reduxState) => {
    return reduxState 
}
export default connect(mapStateToProps)(AllPosts)

