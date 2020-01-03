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

    // setPosts( posts = res.data
    //   // Axios.get("/api/posts").then(res => {
    //   //   props.getAllPosts(res.data);
    //   // posts = res.data
    //   // }
    
    class TestFeed extends Component {
            constructor() {
                    super ()
                    this.state = {
            statePosts: [],
            loading: false
        }
    }
     componentDidMount(){
        this.getPosts()

        console.log(this.props)
    }

    getPosts = async () => {
        await Axios.get("/api/posts").then(res => {
                this.props.getAllPosts(res.data);
        }
        )
    }

    

    render() {
        console.log('kevin', this.props.postReducer[0] && this.props.postReducer[0].caption)

        return (
            <div >Hi

                {this.state.loading ? <h1>LOADING</h1> :
                this.props.postReducer[0] && this.props.postReducer.map( el => {
                    return (
                    <div id='TFComponent'>
                        <div>{el.username}</div>
                        <img id="postImg" src={el.image_url} alt="sunset pic"/>

                    </div>
                    )
                    }
                    )
                }

                
                
                </div>

        )
    }
}

const mapStateToProps = reduxState => reduxState;
// const mapStateToProps = state => {
//    return {posts: state.postReducer}

//   };

export default connect(mapStateToProps, { getAllPosts })(TestFeed);
