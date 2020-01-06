
import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.scss'
import {connect} from 'react-redux'

const Footer = (props) => {
    return(
        <div id='footer_container'>
        
            <Link to='/feed'><i className="fas fa-home"></i></Link>
            <Link to='/TestFeed'><i className="fas fa-hotdog"></i></Link>
            <Link to='/addpost'><i className="far fa-plus-square"></i></Link>
            <Link to='/profile'><img id='footerPic' src={props.userReducer.user.profile_img} alt="profile pic"/> </Link>
        </div>
   
    )
}

const mapStateToProps = reduxState => {
    return reduxState;
  };
export default connect(mapStateToProps) (Footer);