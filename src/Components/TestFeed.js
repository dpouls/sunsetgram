import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllPosts} from './../redux/postReducer'
import Axios from 'axios'

class TestFeed extends Component {
    constructor() {
        super () 
        this.state = {
            statePosts: []
        }
    }
     componentDidMount(){
        this.getPosts()

        // console.log(this.props)
    } 


    getPosts = async () => {
        await Axios.get("/api/posts").then(res => {
         this.setState( {statePosts: res.data} );
          this.props.getAllPosts(res.data)
        // console.log('hola',  res.data)
        console.log('kevin', this.props.postReducer[0])
        // console.log('state',this.state.statePosts[0].id)
        // console.log(this.state.statePosts)

        //   console.log('stateposts:',this.state.statePosts)
        });
        
      };
    render() {
        // console.log('kevin', this.props.postReducer[0].post_id)
    //    let test = this.props.postReducer.map((el)=> {
        //     return <h1>{el.caption}</h1> 
        // console.log('kevin', this.props.postReducer[0].caption)
        //  })
        return (
            <div>Hi
               {/* {this.props.postReducer} */}
        {/* <p>{this.state.statePosts[0].caption}</p> */}
        {/* {this.state.statePosts.map(el => {
            return <div>test</div>
        })} */}
            </div>

        
        )
    }
}


const mapStateToProps = reduxState => reduxState
// const mapStateToProps = state => {
//    return {posts: state.postReducer}

//   };

export default connect(mapStateToProps,{getAllPosts})(TestFeed)