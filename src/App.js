import React, {useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import routes from './routes'
// import Auth from './Components/Auth'
import {getUser} from './redux/userReducer'
import {connect} from 'react-redux'


import {withRouter} from 'react-router-dom'
import Footer from './Components/Footer'
import Axios from 'axios';


function App(props) {
  useEffect(() => {
    console.log('useeffect hit')
    Axios.get('auth/currentuser')
    .then((res) => {
      console.log('res.data',res.data)
      props.getUser(res.data)
    })
  },[props])
  return (
    <div className="App">
      {props.location.pathname === '/' ? (
        <>
        {routes}
        </>
      ) : (
        <>
        {routes}
        <Footer/>
        </>
      )
}
    </div>
  );
}

export default withRouter(connect(null,{getUser}) (App) );
