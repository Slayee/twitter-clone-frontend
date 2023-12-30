import { Avatar } from '@mui/material';
import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import './Post.css'

function Post({p}) {
    const {name, username, image, post, profilePhoto} = p;
  return (
    <div className="post">
        <div className="post-avatar">
            <Avatar src={profilePhoto}/>
        </div>
        <div className="post-body">
            <div className="post-header">
                <div className="post-header-text">
                    <h3>
                        {name}{" "}
                        <span className="post-header-special">
                            <VerifiedIcon className='post-badge'/>
                        </span>
                    </h3>
                </div>
                <div className="post-header-description">
                    <p>{post}</p>
                </div>
                <img src={image} alt="" width='500px'/>
                <div className="post-footer">
                    <ChatBubbleOutlineIcon className='post-footer-icon' fontSize='small'/>
                    <RepeatIcon className='post-footer-icon' fontSize='small'/>
                    <FavoriteBorderIcon className='post-footer-icon' fontSize='small'/>
                    <PublishIcon className='post-footer-icon' fontSize='small'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post