import React,{useEffect,useState} from 'react'
import './DiscoverImages.scss'

const DiscoverImages = (props) => {
    console.log(props)
return (
    <div className={` test gallery_item gallery_item_${props.index}`} >
        <img src={props.post.image_url} className='galleryImg' alt="sun"/>
    </div>
)
}
export default DiscoverImages