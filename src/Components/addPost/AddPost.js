import React from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import './AddPost.scss'




 class AddPost extends React.Component {
    constructor(){
        super()
        this.state = {
            image_url: '',
            caption: '',
            imgPlaceholder: true
        }
    }
    // componentDidUpdate(prevState,prevProps){
    //     if(prevState.image_url !== this.state.image_url)
    //     this.toggleImg()
    // }
    handleInput = (event) => {
        
        this.setState({
            [event.target.name]: event.target.value
        }) 
    }
    toggleImg = () => {
        this.setState({imgPlaceholder: !this.state.imagePlaceholder})
    }
    addPost = () => {
        const {image_url,caption} = this.state
        if(this.state.image_url !== ''){
        Axios.post(`/api/add`,{image_url,caption})
        .then(res => {
            this.props.history.push('/profile')
        })
        .catch(err => console.log(err))
    }
    }
    imgWatcher = () => {
        if (this.state.image_url !== ''){
            this.toggleImg()
        }
    }

    render(){
    return (
        <div id='wholeAddPostContainer'>

            {/* {this.state.imgPlaceholder
            ?
            <div id='imgPlaceholder'>Image will appear here</div>
            : */}
            <img id='imgPreview' src={this.state.image_url} alt=""/>
            
            {/*  */}




            <div id='inputContainer'>
                <input
            className='inputs'
             name='image_url' 
             placeholder='Image URL goes here' 
             type="text"
             
             onChange={(event) => this.handleInput(event)}/>
            <input 
            className='inputs'
            placeholder='Caption goes here'
            type="text"
            name='caption'
            onChange={(event) => this.handleInput(event)}/>
            </div>
            
            <button className='addPostButton' onClick={this.addPost}>Post!</button>
        </div>
    )
    }
}
const mapStateToProps = (reduxState) => {
    return reduxState 
}
export default connect(mapStateToProps) (AddPost)