import React, { Component} from 'react'
// import {connect} from 'react-redux'
// import {getAllPosts} from '../redux/postReducer'
import Axios from 'axios'
import AllPosts from './AllPosts'
// import {getPosts} from '../redux/postReducer'

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
    getPosts = () => {
        Axios.get('/api/posts').then(
        res => { this.setState({posts: res.data})
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
                <div>hi</div>
            </div>
        )
    }
}


//  function Feed () {
//      const [posts, setPosts] = useState([])
    
//      useEffect(() => {
//         Axios.get('/api/posts').then( res => {
//          setPosts(res.data)
//         })
//         .catch(err => console.log(err))
//     }, [])
//     // console.log(posts)

//         return (
//         <div>
//         <div>Feed Component</div>
        // {posts.map((post,index) => (
        //     <AllPosts index={index}  post={post} key={index} />
        //     ))}
//         </div>
//     )
// }

export default Feed


//NOT USING REDUX> MAYBE I DONT NEED TO?