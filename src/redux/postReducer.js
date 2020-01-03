// import Axios from "axios"

const initialState = {
    posts: []
}

const GET_POSTS = 'GET_POSTS'
const GET_POSTS_PENDING = 'GET_POSTS_PENDING'
const GET_POSTS_FULFILLED = 'GET_POSTS_FULFILLED'







export function getAllPosts(postArr){


    
    // console.log('postArr', postArr)
    return {
        type: GET_POSTS,
        payload: postArr
    }
}

export default function postReducer(state = initialState, action){
    const {type, payload} = action
    console.log('PR payload',payload)
    switch(type){
        case GET_POSTS_PENDING:
            return Object.assign({}, state, {loading: true})
        case GET_POSTS_FULFILLED:
            return Object.assign({}, state, {loading: false})

        case GET_POSTS:
            return [...payload]
        default:
            return state;
    }
    
}