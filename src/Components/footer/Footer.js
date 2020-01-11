
import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.scss'
import {connect} from 'react-redux'

const Footer = (props) => {
    return(
        <div id='footer_container'>
       
            {/* <Link to='/post/77'><i class="fas fa-hat-wizard"></i></Link> */}
            <Link to='/following'><i className="fas fa-home"></i></Link>
            <Link to='/discover'><i className="fas fa-search"></i></Link>
            <Link to='/addpost'><i className="far fa-plus-square"></i></Link>
            <Link to='/notifications'><i class="far fa-heart"></i></Link>
            <Link to='/profile'><img id='footerPic' src={props.userReducer.user.profile_img} alt=""/> </Link>
        </div>
   
    )
}

const mapStateToProps = reduxState => {
    return reduxState;
  };
export default connect(mapStateToProps) (Footer);