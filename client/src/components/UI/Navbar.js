import React from 'react'
import './static/Navbar.css'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div className="nav">
        
                <ul>
                <Link to="/"><li className="lead">Home</li></Link>
                <Link to="/posts"><li className="lead">Blog</li></Link>
                <li className="lead">Documentation</li>
                <li className="lead">About</li>
                
                </ul>
           
        </div>
    )
}

export default Navbar
