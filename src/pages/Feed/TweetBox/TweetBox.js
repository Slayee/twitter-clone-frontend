import React, { useState } from 'react'
import './TweetBox2.css'
import {Avatar} from '@mui/material'
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate'
import axios from 'axios'
import useLoggedInUser from '../../../hooks/useLoggedInUser'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../../firebase.init'

function TweetBox() {
    const [post, setPost] = useState('');
    const [imageURL, setImageURL]= useState('');
    const [isLoading, setIsLoading] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [loggedInUser] = useLoggedInUser();
    // console.log(loggedInUser);
    const [user] = useAuthState(auth);
    const email = user?.email;

    // show user profile picture
    const userProfilePic = loggedInUser[0]?.profileImage? loggedInUser[0]?.profileImage :"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" ;
    
    //Uploading image event
    const handleImageUpload = (e) => {
        // isLoading(true);
        const image = e.target.files[0];
        console.log(image);

        const formData = new FormData();
        formData.set('image', image);
        //posting image on the imgbb.com
        // axios.post('<API>?key=<Api Key>')
        axios.post('https://api.imgbb.com/1/upload?key=1ec7fa3cb3d3e4e6041d2b11045e550a', formData)
            .then(res => {
                setImageURL(res.data.data.display_url);
                console.log(res.data.data.display_url);
                setIsLoading(false);
            })
            .catch((error)=>{
                console.log(error);
                setIsLoading(false);
            })
    }

    const handleTweet = (e) => {
        e.preventDefault();
        // console.log(user);
        // console.log(post);
        if(user.providerData[0].providerId==='password'){
            fetch(`https://twitter-clone-backend-ftuv.onrender.com/loggedInUser?email=${email}`)
                .then(res=> res.json())
                .then(data => {
                setName(data[0]?.name)
                setUsername(data[0]?.username)
                })
        }else{
            setName(user?.displayName)
            setUsername(email?.split('@')[0])
        }
        if(name){
            const userPost = {
                profilePhoto: userProfilePic,
                post: post,
                image: imageURL,
                username: username,
                name:name,
                email:email,
            } 
            // console.log(userPost);
            //to set the text box and image url empty
            setPost('');
            setImageURL('');

            // send data to the backend
            fetch('https://twitter-clone-backend-ftuv.onrender.com/post',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userPost)
            })
            .then(res => res.json())
            .then(data => console.log(data))
        }
    }
    

  return (
    <div className='tweet-box'>
        <form onSubmit={handleTweet}>
            <div className="tweet-box-input">
                <Avatar src={userProfilePic}/>
                <input type = 'text' placeholder = "What's happening?" value={post} required onChange={(e)=>(setPost(e.target.value))}/>
            </div>

            <div className='image-icon-tweet-button'>
                <label htmlFor='image' className='image-icon'>
                    {
                        isLoading ? <p>Uploading Image</p> : <p>{imageURL ? 'image uploaded': <AddPhotoAlternate />}</p>
                    } 
                </label>
                <input type='file' id='image' className='image-input' onChange={handleImageUpload}/>
                <button className='tweet-box-tweet-button' type = "submit">
                    Tweet
                </button>
            </div>

        </form>
    </div>
  )
}

export default TweetBox