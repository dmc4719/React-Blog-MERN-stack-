import React from 'react'
import './static/Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import reactIcon from './../../pages/assets/React.png'
import { useSelector,useDispatch } from 'react-redux'
import {logout} from './../../store/actions/authActions'
function Navbar(props) {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()
    return (
        <nav>
        <a href="#"><img className="react" src={reactIcon} />Blog<sup>TM</sup></a>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/posts">Blogs</Link></li>
            <li>About</li>
            {
            auth.isAuthenticated? 
            <li onClick={()=>dispatch(logout(history))}>Logout</li> :
            <li><Link to='/login'>Login</Link></li>
            }
        </ul>
        <a className="ham" href="#" ><div className="nav-icon"><div></div></div></a>
     
        <ul className="profile">
            <i className="fa fa-search"></i>
            <i className="fa fa-user"></i>
            <i className="fa fa-envelope"></i>
            
        </ul>
    </nav>
    )
}

export default Navbar
