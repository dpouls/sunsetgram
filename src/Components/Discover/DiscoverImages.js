import React,{useEffect,useState} from 'react'
import './DiscoverImages.scss'
import {withRouter} from 'react-router-dom'

const DiscoverImages = (props) => {
    console.log(props.post.post_id)
    const goToPost = () => {
        const post_id = props.post.post_id
        console.log(post_id)
        props.history.push(`/post/${post_id}`)
    }
return (
    <div onClick={() => goToPost()} className={` test gallery_item gallery_item_${props.index}`} >
        <img src={props.post.image_url} className='galleryImg' alt="sun"/>
    </div>
)
}
export default withRouter(DiscoverImages)