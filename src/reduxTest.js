import axios from 'axios'

export const getThePeople = function () {
    return axios.get('/api/posts')
    .then(res => console.log('resdata',res.data))
    // console.log(res.data)
}

getThePeople()