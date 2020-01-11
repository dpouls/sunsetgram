import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/auth/Auth'
import Feed from './Components/feed/Feed'
import TestFeed from './Components/practice/TestFeed'
import Profile from './Components/profile/Profile'
import Discover from './Components/Discover/Discover'
import Notifications from './Components/Notifications/Notifications'
import FollowingFeed from './Components/followingFeed/FollowingFeed'
import SpecificUserProfile from './Components/SpecificUserProfile/SpecificUserProfile'
import AddPost from './Components/addPost/AddPost'
import IndividualPost from './Components/individualPost/IndividualPost'


export default (

    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/notifications' component={Notifications}/>
        <Route path='/discover' component={Discover}/>
        <Route path='/following' component={FollowingFeed}/>
        <Route path='/specificprofile/:id' component={SpecificUserProfile}/>
        <Route path='/addpost' component={AddPost}/>
        <Route path='/feed' component = {Feed}/>
        <Route path='/testfeed' component = {TestFeed}/>
        <Route path='/post/:post_id' component = {IndividualPost}/>
    </Switch>

)