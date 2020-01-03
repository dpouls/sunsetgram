// import Axios from "axios"

const initialState = {
    posts: []
}

const GET_POSTS = 'GET_POSTS'

export function getAllPosts(postArr){


    
    console.log('postArr', postArr)
    return {
        type: GET_POSTS,
        payload: postArr
    }
}

export default function postReducer(state = initialState, action){
    const {type, payload} = action
    console.log('PR payload',payload)
    switch(type){
        case GET_POSTS:
            return [...payload]
        default:
            return state;
    }
    
}