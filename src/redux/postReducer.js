// import Axios from "axios"
import * as reduxTest from './../reduxTest'

const initialState = {
    posts: [],
    loading: false
}

const GET_POSTS = 'GET_POSTS'
const GET_POSTS_PENDING = 'GET_POSTS_PENDING'
const GET_POSTS_FULFILLED = 'GET_POSTS_FULFILLED'






export function getAllPosts(){
    // console.log('postArr', postArr)
    return {
        type: GET_POSTS,
        payload: reduxTest.getAllPosts()
    }
}

export default function postReducer(state = initialState, action){
    const {type, payload} = action
    // console.log('PR payload',payload)
    switch(type){
        case GET_POSTS_PENDING:
            return Object.assign({}, state, {loading: true})
        case GET_POSTS_FULFILLED:
            return Object.assign({}, state, {loading: false, posts: payload})

        case GET_POSTS:
            return [...payload]
        default:
            return state;
    }
    
}