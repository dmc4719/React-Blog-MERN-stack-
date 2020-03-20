import React, {useEffect} from 'react'
import './static/Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import reactIcon from './../../pages/assets/React.png'
import { useSelector,useDispatch } from 'react-redux'
import {logout} from './../../store/actions/authActions'
import $ from 'jquery'
var flag = false

function navdrawer(){
    var nav = document.querySelector('.nav-icon')
    var drawer = document.querySelector('.drawer')
    nav.addEventListener('click', ()=>{
        if(flag=== false){
            flag = true
            drawer.style.transform ="translateY(0%)"
            nav.classList.toggle("ni")
        }
        else{
            flag = false
            drawer.style.transform ="translateY(-100%)"
            nav.classList.toggle("ni")
        }
    })
    
}




function Navbar(props) {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        navdrawer()
    }, [])

    return (

        <div>

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
    <div className="drawer">
        <ul>
            <li>Blogs</li>
            <li>Profile</li>
            {
            auth.isAuthenticated? 
            <li onClick={()=>dispatch(logout(history))}>Logout</li> :
            <li><Link to='/login'>Login</Link></li>
            }
        </ul>
    </div>   
        </div>
  
    )
}

export default Navbar
