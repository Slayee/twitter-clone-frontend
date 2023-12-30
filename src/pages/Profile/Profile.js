import React from 'react'
import '../Pages.css'
import MainPage from './MainPage/MainPage'
import {useAuthState} from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'

function Profile() {
  const [user] = useAuthState(auth);
  return (
    <div className="profile-page">
      <MainPage user={user}/>
    </div>

  )
}

export default Profile