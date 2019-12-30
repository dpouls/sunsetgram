import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth'
import Feed from './Components/Feed'
import Profile from './Components/Profile'
import AddPost from './Components/AddPost'


export default (

    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/addpost' component={AddPost}/>
        <Route path='/feed' component = {Feed}/>
    </Switch>

)