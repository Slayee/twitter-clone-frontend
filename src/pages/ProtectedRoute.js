import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom';
import auth from '../firebase.init';
import PageLoading from './PageLoading/PageLoading';

function ProtectedRoute({children}) {
  const [user, isLoading] =useAuthState(auth);

  if(isLoading){
    return <PageLoading loading={isLoading}/>
  }

  if(!user){
    return <Navigate to='/login'/>
  }

  return children;
}

export default ProtectedRoute