import React, { Component} from 'react'
import Axios from 'axios'
import AllPosts from './AllPosts'

class Feed extends Component {
    constructor(){
        super()
        this.state = {
            posts: []
        }
    }
 
    componentDidMount = () =>{
        this.getPosts()

    }
    getPosts =  () => {
        Axios.get('/api/posts').then(
        res => { this.setState({posts: res.data})
        console.log('getposts hit')
    }
    )
    }
    render(){
        const {posts} = this.state
        return (
            <div>
               {posts.map((post,index) => (
            <AllPosts getPostsFn={this.getPosts} index={index}  post={post} key={index} />
            ))}
            </div>
        )
    }
}



export default Feed


