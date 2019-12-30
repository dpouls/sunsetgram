import React, {Component} from 'react'
import Axios from 'axios'
import {logout} from '../redux/userReducer'
import {connect} from 'react-redux'
import MyPosts from './MyPosts'

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            myPosts: []
        }
    }
    componentDidMount = () => {
        this.getMyPosts()
    }
    getMyPosts = () => {
        
        Axios.get(`/api/myposts`)
        .then(res => {this.setState({myPosts: res.data})})
        .catch(err => console.log(err))
    }
     logout = () => {
         Axios.post('/auth/logout').then( res => {
             this.props.logout()
             this.props.history.push('/')
         })
         .catch(err => console.log("logout err", err))
     }
     render(){
    return (
        <div>Profile Component
            <h2>@{this.props.userReducer.user.username}</h2>
            <button onClick={this.logout}>Log Out</button>
            {this.state.myPosts.map((post,index) => (
                <MyPosts getMyPostsFn={this.getMyPosts} index={index} post={post} key={index} />
            ))}
        </div>
        )
     }
     
}
const mapStateToProps = (reduxState) => {
        return reduxState 
}
export default connect(mapStateToProps,{logout})(Profile)

