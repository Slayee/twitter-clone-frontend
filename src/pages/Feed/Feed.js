import React, { useEffect, useState } from 'react'
import '../Pages.css'
import TweetBox from './TweetBox/TweetBox'
import Post from './Post/Post'

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://twitter-clone-backend-ftuv.onrender.com/post')
    .then(res => res.json())
    .then(data=> setPosts(data))
  },[posts])


  return (
    <div className="feed">
      <div className="feed_header">
        <h2>Home</h2>
      </div>
      <div><TweetBox/></div>
      {
        posts.map(post => <Post key={post._id} p={post}/>)
      }
    </div>
  )
}

export default Feed