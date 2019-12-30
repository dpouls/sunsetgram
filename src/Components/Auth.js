import React, {Component} from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {getUser} from '../redux/userReducer'
// import { render } from '@testing-library/react';
// import {Link} from 'react-router-dom'
import './../App.css'

class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            toggleRegister: false
        }
    }
    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    toggleRegister = () => {
        this.setState({toggleRegister: true})
    }
    handleRegister = () => {
        const {username, password} = this.state
        Axios.post('/auth/register', {username, password}).then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/feed')
        })
        .catch(err => console.log(err))
    }

    //Need to try to alert for username and/or password errors
    handleLogin = () => {
        Axios.post('/auth/login', {username: this.state.username, password: this.state.password}).then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/feed')
            // alert(res.data)
            // console.log('res',res.data)
        }
        )
        .catch(err => console.log(err))
    }
    render(){
        return(
            <>
            <h1 id='title'>Sunny</h1>
            {this.state.toggleRegister ? 
           ( <div id='authContainer'>
                 <input className='loginInputs'
                    maxLength='100'
                    placeholder='Create username'
                    name='username'
                    onChange={(event) => this.handleInput(event)}/>
                <input
                className='loginInputs'
                    type='password' 
                    maxLength='20'
                    placeholder='Create Password'
                    name='password'
                    onChange={(event) => this.handleInput(event)}/>
                <button onClick={this.handleRegister}>Register</button>
           </div> ) : (
            <div id='authContainer'>
                 <input 
                 className='loginInputs'
                    maxLength='100'
                    placeholder='Enter Username'
                    name='username'
                    onChange={(event) => this.handleInput(event)}/>
                <input
                className='loginInputs'
                    type='password' 
                    maxLength='20'
                    placeholder='Enter Password'
                    name='password'
                    onChange={(event) => this.handleInput(event)}/>
                <button onClick={this.handleLogin}>Log In</button>
                <button onClick={this.toggleRegister}>Register</button>
           </div>
           )
    }
            </>
        )
    }
}

export default connect (null, {getUser})(Auth)