import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed'
import './Widgets.css'

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets-input">
        <SearchIcon className='widgets-search-icon'/>
        <input type="text" placeholder='Search Twitter' />
      </div>

      <div className="widgets-widget-container">
        <h2>What's Happening!!</h2>
      </div>

      <TwitterTweetEmbed tweetId={'1557187138352861186'}/>

      <TwitterTimelineEmbed sourceType='profile' screenName='elonmusk' options={{height: '400px'}} />     
    </div>
  )
}

export default Widgets