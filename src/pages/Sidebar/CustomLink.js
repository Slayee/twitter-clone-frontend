import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

//to make the sidebar links active when match the perticular route
function CustomLink({children, to, ...props}) {
    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true})
  return (
    <div>
        <Link to={to} {...props} style={{textDecoration: 'none', color: match? 'var(--twitter-color)':'black'}}>
            {children}
        </Link>
    </div>
  )
}

export default CustomLink