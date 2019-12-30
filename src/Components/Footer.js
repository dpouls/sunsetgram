
import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css'

const Footer = () => {
    return(
        <div id='footer_container'>
            <Link to='/feed'>Feed </Link>
            <Link to='/profile'>Profile </Link>
            <Link to='/addpost'>Add Post</Link>
        </div>
    )
}

export default Footer;