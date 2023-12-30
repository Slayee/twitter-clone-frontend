import React from 'react'
import './SidebarOptions.css'

function SidebarOptions({ text, Icon}) {
  return (
    <div className='sidebar-options'>
        <Icon className='sidebar-icon'/>
        <h2>{text}</h2>
    </div>
  )
}

export default SidebarOptions