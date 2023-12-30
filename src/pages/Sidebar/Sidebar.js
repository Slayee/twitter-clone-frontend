import React, { useState } from 'react'
import './Sidebar.css'
  import { Done, MoreHoriz, Twitter, Home, Search, Notifications, MailOutline, BookmarkBorder, ListAlt, PermIdentity, MoreHorizRounded } from '@mui/icons-material'
import SidebarOptions from './SidebarOptions/SidebarOptions'
import { Avatar, Button, Divider, IconButton, ListItem, Menu, MenuItem } from '@mui/material'
// import { Link } from 'react-router-dom'
// import  { datas }  from './Data.js'
import CustomLink from './CustomLink.js'
import useLoggedInUser from '../../hooks/useLoggedInUser.js'

function Sidebar({handleLogout, user}) {
  const  [anchorElement, setAnchorElement] = useState(null);
  const openMenu = Boolean(anchorElement);
  const [loggedInUser] = useLoggedInUser();

  const userProfilePic = loggedInUser[0]?.profileImage? loggedInUser[0]?.profileImage :"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" ;

  
  // const listRoutes = datas.map((data)=>
  //   <CustomLink to={data.to}>
  //     <SidebarOptions Icon={data.icon} text={data.text}/>
  //   </CustomLink>);
  
  const handleClick= e => {
    setAnchorElement(e.currentTarget);
  }
  const handleClose = () => {
    setAnchorElement(null)
  }

  const result = user[0]?.email.split('@')[0];
  

    return (
    <div className='sidebar'>
      <Twitter className='sidebar-twitter-icon'/>
      <CustomLink to='/home/feed'>
        <SidebarOptions active Icon={Home} text='Home'/>    
      </CustomLink>
      <CustomLink to='/home/explore'>    
        <SidebarOptions active Icon={Search} text='Explore'/>
      </CustomLink>
      <CustomLink to='/home/notification'>    
        <SidebarOptions active Icon={Notifications} text='Notifications'/>
      </CustomLink>
      <CustomLink to='/home/messages'>    
        <SidebarOptions active Icon={MailOutline} text='Messages'/>
      </CustomLink>
      <CustomLink to='/home/bookmark'>    
        <SidebarOptions active Icon={BookmarkBorder} text='Bookmark'/>
      </CustomLink>
      <CustomLink to='/home/lists'>    
        <SidebarOptions active Icon={ListAlt} text='List'/>
      </CustomLink>
      <CustomLink to='/home/profile'>    
        <SidebarOptions active Icon={PermIdentity} text='Profile'/>
      </CustomLink>
      <CustomLink to='/home/more'>    
        <SidebarOptions active Icon={MoreHorizRounded} text='More'/> 
      </CustomLink>

      {/* {listRoutes} */}

      <Button variant='outlined' className='sidebar-button-tweet'>
        Tweet
      </Button>   
      <div className="profile-info">
        <Avatar src={userProfilePic}/>
        <div className="user-info">
          <h4>{loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user[0]?.displayName }</h4>
          <h5>@{result}</h5>
        </div>
        <IconButton 
          size='small' 
          sx={{ml: 2}} 
          aria-controls={ openMenu ? "basic-menu" : undefined } 
          aria-haspopup='true'
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleClick}
          >
          <MoreHoriz/>
        </IconButton>
        <Menu id='basic-menu' anchorElement={anchorElement} open={openMenu} onClick={handleClose} onClose={handleClose}>
          <MenuItem className='profile-info'>
          <Avatar src={userProfilePic}/>
            <div className="user-info sub-user-info">
              <div>
                <h4>{loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user[0]?.displayName }</h4>
                <h5>@{result}</h5>
              </div>
              <ListItem className='done-icon'><Done/></ListItem>
            </div>
          </MenuItem>
          <Divider/>
          <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
          <MenuItem onClick={handleLogout}>Log out @abc</MenuItem>
        </Menu>
      </div>  
    </div>
  )
}

export default Sidebar