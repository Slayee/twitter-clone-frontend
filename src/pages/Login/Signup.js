import React, { useState } from 'react'
import twitterImage from "../../assets/images/twitter-login-page.jpg"
import { Twitter } from '@mui/icons-material'
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
import GoogleButton from 'react-google-button'
import { Link, useNavigate } from 'react-router-dom'
import "./Login2.css"
import axios from 'axios'

function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
    
    // For navigating the pages
    const navigate = useNavigate();
    
    // Create user with id and password
    const handleSubmit =(e) =>{
        e.preventDefault();
        console.log(email, password);
        createUserWithEmailAndPassword(email, password);

        const user = {
            username:username,
            name: name,
            email: email
        }

        const {data} = axios.post('https://twitter-clone-backend-ftuv.onrender.com/register', user);
        console.log(data);
    }

    //Sign in using google sign in
    const handleGoogleSignIn = () =>{
        signInWithGoogle();
    }

    // If the user is present then navigate to '/' which is Home.jsx
    if(user||googleuser){
        navigate('/');
        console.log(user);
        console.log(googleuser);
    }
    if(error){
        console.log(error.message);
    }
    if(loading){
        console.log('loading');
    }

  return (
    <div className="signup-container">
        <div className="image-container">
            <img className='image' src={twitterImage} alt="" />
        </div>
        <div className="form-container">
            <div className="form-box">

                <Twitter className='twitter-img'/>
                <h2 className='heading'>Happening Now</h2>
                <h3 className="heading1">Join Twitter today</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" className='display-name' placeholder='Username'  onChange={e=>setUsername(e.target.value)}/>
                    <input type="text" className='display-name' placeholder='Enter Full Name' onChange={e=>setName(e.target.value)}/>
                    <input type="email" className='email' placeholder='Email Address' onChange={e=>setEmail(e.target.value)}/>
                    <input type="password" className='password' placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
                    <div className="btn-login">
                        <button type="submit" className="btn">Sign up</button>
                    </div>
                </form>
                <hr/>
                <div className='google-button'>
                    <GoogleButton className='g-btn' onClick={handleGoogleSignIn}/>
                </div>
                <div>
                    Already have an account! 
                    <Link 
                    to='/login' 
                    style={{ textDecoration: 'none',
                    color: 'skyblue',
                    fontWeight: 600,
                    marginLeft: '5px'}}
                    >Login</Link>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Signup