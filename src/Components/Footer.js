
import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css'
import '../componentStyling/Footer.scss'


const Footer = () => {
    return(
        <div id='footer_container'>
        
            <Link to='/feed'><i className="fas fa-home"></i></Link>
            
            
            <Link to='/addpost'><i className="far fa-plus-square"></i></Link>
            <Link to='/profile'><img id='footerPic' src="https://robohash.org/rob?set=set5   " alt="profile pic"/> </Link>
        </div>
   
    )
}

export default Footer;