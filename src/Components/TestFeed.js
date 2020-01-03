import React, { Component, useState, useEffect } from "react";

import { connect } from "react-redux";
import { getAllPosts } from "./../redux/postReducer";
import Axios from "axios";
import "./../componentStyling/TestFeed.scss";

// const TestFeedHook = props => {
//   const [posts, setPosts] = useState([]);
//   useEffect( () => {
//         axios.get('/api/posts')
//         .then(res => props.getAllPosts(res.data) )
//           ;
          
//         // console.log('posts',posts)

//   },[])

//       console.log('this.props',props)
//       return (
//       <div>hello
// {props.postReducer[0] && props.postReducer.map(el => {return (<div>test</div>)})}
//       </div>


//       )
//     };

    
    class TestFeed extends Component {
            constructor() {
                    super ()
                    this.state = {
            statePosts: []
            // loading: false
        }
    }
     componentDidMount(){
        // this.getPosts()
        this.props.getAllPosts()

        console.log('this.props',this.props)
    }

    logger(){
        console.log('this.props logger',this.props)
    }

    render() {


        const postsFromRedux = this.props.posts.map((el,i) => {
        return <div key={i}>{this.props.loading}{el.caption}</div>
        })
        return (
            <div >Hi
                <button onClick={this.props.getAllPosts}>GET POSTS</button>
                <button onClick={() => this.logger()}>log props</button>
                {postsFromRedux}
                Loading: {this.props.loading ? 'its loading...' : 'done'}
                {this.props.loading ? 'getting captions' : postsFromRedux }
                </div>

        )
    }
}

// const mapStateToProps = reduxState => reduxState;
const mapStateToProps = state => {
   return {posts: state.postReducer.posts,
           loading: state.postReducer.loading
        }

  };

export default connect(mapStateToProps, { getAllPosts })(TestFeed);
