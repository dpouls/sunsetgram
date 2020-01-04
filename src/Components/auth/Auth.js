import React, {Component} from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {getUser} from '../../redux/userReducer'
import './Auth.scss'

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
    toggleLogin = () => {
        this.setState({toggleRegister: false})
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
               <div className='loginInputContainer'>
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
                    </div>
                <button className='loginButton' onClick={this.handleRegister}>Register</button>
                <p id='haveAccount' onClick={this.toggleLogin}>I already have an account.</p>
           </div> ) : (
            <div id='authContainer'>
                <div className='loginInputContainer' >
                 <input 
                 className='loginInputs'
                    maxLength='100'
                    placeholder='Username'
                    name='username'
                    onChange={(event) => this.handleInput(event)}/>
                <input
                className='loginInputs'
                    type='password' 
                    maxLength='20'
                    placeholder='Password'
                    name='password'
                    onChange={(event) => this.handleInput(event)}/>
                    </div>
                <button className='loginButton' onClick={this.handleLogin}>Log In</button>
                <section id='registerContainer'>
                    <p>Don't have an account?</p>
                <p id='signUp' onClick={this.toggleRegister}>Sign up.</p>
                </section>
                
              
           </div>
           )
    }
            </>
        )
    }
}

export default connect (null, {getUser})(Auth)