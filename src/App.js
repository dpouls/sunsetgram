import React, {useEffect} from 'react';
import './App.scss';
import routes from './routes'
import {getUser} from './redux/userReducer'
import {connect} from 'react-redux'


import {withRouter} from 'react-router-dom'
import Footer from './Components/footer/Footer'
import Axios from 'axios';


function App(props) {
  useEffect(() => {
    Axios.get('/auth/currentuser')
    .then((res) => {
      props.getUser(res.data)
    })
    // .catch(err => props.history.push('/'))
  },[])
  return (
    <div id='wholeThing'>
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
    </div>
  );
}

export default withRouter(connect(null,{getUser}) (App) );
