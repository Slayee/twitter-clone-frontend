import React, { useState } from 'react'
import twitterImage from "../../assets/images/twitter-login-page.jpg"
import { Twitter } from '@mui/icons-material'
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init';
import './Login2.css'
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // const [error, setError] = useState('');
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);

    // Create user with id and password
    const handleSubmit =(e) =>{
        e.preventDefault();
        console.log(email, password);
        signInWithEmailAndPassword(email, password);
    }

    // Sign in using google sign in
    const handleGoogleSignIn = () =>{
        signInWithGoogle();
    }

    // If the user is present then navigate to route '/', which is Home.js
    if(user||googleuser){
        navigate('/');
        console.log(user);
    }
    if(error){
        console.log(error.message);
    }
    if(loading){
        console.log('loading');
    }
  return (
    <div className="login-container">
        <div className="image-container">
            <img src={twitterImage} alt="" />
        </div>
        <div className="form-container">
            <div className="form-box">
                <Twitter className='twitter-img'/>
                <h2 className='heading'>Happening Now</h2>
                <h3 className='heading-2'>What happening Today</h3>
                <form onSubmit={handleSubmit}>
                    
                    <input type="email" className='email' placeholder='Email Address' onChange={e=>setEmail(e.target.value)}/>
                    <input type="password" className='password' placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
                    <div className="btn-login">
                        <button type="submit" className="btn">Login</button>
                    </div>
                </form>
                <hr/>
                <div className='google-button'>
                    <GoogleButton className='g-btn' onClick={handleGoogleSignIn}/>
                </div>
                <div>
                    Don't have an account! <Link to='/signup' className='signup-button'>Sign up</Link>
                </div>
            </div>
                
        </div>
    </div>
  )
}

export default Login