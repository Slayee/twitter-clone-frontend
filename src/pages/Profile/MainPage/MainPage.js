import React, { useEffect, useState } from 'react'
import './MainPage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LockResetIcon from '@mui/icons-material/LockReset';
import {useNavigate} from 'react-router-dom'
import useLoggedInUser from '../../../hooks/useLoggedInUser'
import Post from '../../Feed/Post/Post';
import axios from 'axios';
import EditProfile from '../EditProfile/EditProfile';

function MainPage({user}) {
  const navigate = useNavigate();
  const [loggedInUser] = useLoggedInUser();
  const username = user?.email?.split('@')[0];
  const [isLoading, setIsLoading] = useState('');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`https://twitter-clone-backend-ftuv.onrender.com/userPost?email=${user?.email}`)
    .then(res => res.json())
    .then(data=> setPosts(data))
  },[posts, user?.email])

  const handleUploadCoverImage = (e) => {
    const image = e.target.files[0];
        console.log(image);

        const formData = new FormData();
        formData.set('image', image);
        //posting image on the imgbb.com
        // axios.post('<API>?key=<Api Key>')
        axios.post('https://api.imgbb.com/1/upload?key=1ec7fa3cb3d3e4e6041d2b11045e550a', formData)
            .then(res => {
                const url = res.data.data.display_url;
                const userCoverImage = {
                  email: user?.email,
                  coverImage: url
                }
                setIsLoading(false);
                if(url){
                  axios.patch(`https://twitter-clone-backend-ftuv.onrender.com/userUpdates/${user?.email}`, userCoverImage)
                }
            })
            .catch((error)=>{
                console.log(error);
                setIsLoading(false);
            })
  }

  const handleUploadProfileImage = (e) => {
    const image = e.target.files[0];
    console.log(image);

    const formData = new FormData();
    formData.set('image', image);
    //posting image on the imgbb.com
    // axios.post('<API>?key=<Api Key>')
    axios.post('https://api.imgbb.com/1/upload?key=1ec7fa3cb3d3e4e6041d2b11045e550a', formData)
        .then(res => {
            const url = res.data.data.display_url;
            const userProfileImage = {
              email: user?.email,
              profileImage: url
            };
            setIsLoading(false);
            if(url){
              axios.patch(`https://twitter-clone-backend-ftuv.onrender.com/userUpdates/${user?.email}`, userProfileImage)

            }
        })
        .catch((error)=>{
            console.log(error);
            setIsLoading(false);
        })
  }

  return (
    <div>
      <ArrowBackIcon className='arrow-icon' onClick={()=>{navigate('/')}} />
      <h4 className='heading-4'>@{username}</h4>
      <div className="main-profile">
        <div className="profile-bio">
          {
            <div>
              <div className="cover-image-container">
                <img src={loggedInUser[0]?.coverImage?loggedInUser[0]?.coverImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt="" className='cover-image'/>
                <div className="hover-cover-image">
                  <label htmlFor="image" className='image-icon'>
                    {
                      isLoading ? <LockResetIcon className='photoIcon photoIconDisabled'/>:<CenterFocusWeakIcon className='photo-icon'/>
                    }
                  </label>
                  <div className="image-icon-tweet-button">
                    <input type="file" id='image' className='image-input' onChange={handleUploadCoverImage} />
                  </div>
                </div>
              </div>
              <div className="avatar-image">
                <div className="avatar-container">
                  <img src={loggedInUser[0]?.profileImage?loggedInUser[0]?.profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} alt="" className='avatar'/>
                  <div className="hover-avatar-image">
                    <div className="image-icon-tweet-button">
                      <label htmlFor="profile-image" className='image-icon'>
                      {
                        isLoading ? <LockResetIcon className='photoIcon photoIconDisabled'/> : <CenterFocusWeakIcon className='photo-icon'/>
                      }
                      </label>
                      <div className="image-icon-tweet-button">
                        <input type="file" id='profile-image' className='image-input' onChange={handleUploadProfileImage} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="user-info">
                  <div>
                    <h3 className="heading-3">
                      {loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName }
                    </h3>
                    <p className="username-section">@{username}</p>
                  </div>
                  <EditProfile user={user} loggedInUser={loggedInUser}/>
                  <div className="info-container">
                      { loggedInUser[0]?.bio ? loggedInUser[0]?.bio : '' }
                    <div className="location-and-link">
                      { loggedInUser[0]?.location ? <p className="subinfo"><MyLocationIcon/>{loggedInUser[0]?.location}</p> : '' }
                      { loggedInUser[0]?.website ? <p className="subinfo link"><AddLinkIcon/>{loggedInUser[0]?.website}</p> : '' }
                    </div>
                  </div>
                </div>
                  <h4 className="tweets-text">Tweets</h4>
                  <hr />
                {
                  posts.map(p=> <Post id={p._id} p={p}/>)
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MainPage