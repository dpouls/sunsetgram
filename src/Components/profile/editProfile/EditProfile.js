import React, {useState,useEffect} from 'react'
import {getUser} from '../../../redux/userReducer'
import {connect} from 'react-redux'
import Axios from 'axios'

const EditProfile = (props) => {
    const [userInfo, setUserInfo] = useState([])
    const [imgUrl, setImgURL] = useState([])
    useEffect(() => {
        // console.log('imgurl',imgUrl)
        console.log('editprofile props.userreducer.user', props.userReducer.user)
    },
    [props.userReducer.user]
    )
    const handleSubmit = (e) => {
        // e.preventDefault()
        Axios.put('/api/editprofile',{imgUrl})
        .then( (res) => props.getUser(res.data[0]))
        // console.log(res.data)
        
    }
    return (
        <form onSubmit={handleSubmit}>
        <input type="file"/>
        <input 
        onChange={e => setImgURL(e.target.value)}
        name={imgUrl}
        type="text"
        />
        <button onClick={() => handleSubmit()}></button>

        </form>

    )


}
const mapStateToProps = reduxState => {
    return reduxState;
  };
export default connect(mapStateToProps,{getUser})(EditProfile)