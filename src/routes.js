import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/auth/Auth'
import Feed from './Components/feed/Feed'
import TestFeed from './Components/practice/TestFeed'
import Profile from './Components/profile/Profile'
import AddPost from './Components/addPost/AddPost'


export default (

    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/addpost' component={AddPost}/>
        <Route path='/feed' component = {Feed}/>
        <Route path='/testfeed' component = {TestFeed}/>
        
    </Switch>

)