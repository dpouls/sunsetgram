import axios from 'axios'

export const getAllPosts = function () {
    return axios.get('/api/posts')
    .then(res => res.data)
    
}

