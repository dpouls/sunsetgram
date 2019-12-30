import React from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'


 class AddPost extends React.Component {
    constructor(){
        super()
        this.state = {
            image_url: '',
            caption: ''
        }
    }
    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }) 
    }
    addPost = () => {
        const {image_url,caption} = this.state
        Axios.post(`/api/add`,{image_url,caption})
        .then(res => {
            this.props.history.push('/profile')
        })
        .catch(err => console.log(err))
    }
    render(){
    return (
        <div>AddPost Component
            <img src={this.state.image_url} alt=""/>
            <input
             name='image_url' 
             placeholder='Image URL goes here' 
             type="text"
             onChange={(event) => this.handleInput(event)}/>
            <input 
            placeholder='Caption goes here'
            type="text"
            name='caption'
            onChange={(event) => this.handleInput(event)}/>
            <button onClick={this.addPost}>Post!</button>
        </div>
    )
    }
}
const mapStateToProps = (reduxState) => {
    return reduxState 
}
export default connect(mapStateToProps) (AddPost)