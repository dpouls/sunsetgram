import React, {useState,useEffect} from 'react'
import {getUser} from '../../../redux/userReducer'
import {connect} from 'react-redux'
import Axios from 'axios'

const EditProfile = (props) => {
    const [userInfo, setUserInfo] = useState([])
    const [imgUrl, setImgURL] = useState('')
    useEffect(() => {
        console.log('imgurl',imgUrl)
    },
    [imgUrl]
    )
    const handleSubmit = async () => {
        console.log('hit')
       let res =  await Axios.put('/api/editprofile',{imgUrl})
       
           console.log(res.data[0])

          await  props.getUser(res.data[0])

          setImgURL('')

           console.log(props)
        
      
    }
    // console.log('props', props)
    return (
    <form >
        <input type="file"/>
        <input 
        onChange={e => setImgURL(e.target.value)}
        name={imgUrl}
        value={imgUrl}
        type="text"
        />
        <button type='button' onClick={() => handleSubmit()}>O</button>

        </form>

    )


}
const mapStateToProps = reduxState => {
    return reduxState;
  };
export default connect(mapStateToProps,{getUser})(EditProfile)