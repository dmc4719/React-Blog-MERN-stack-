import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from './../store/actions/authActions'
import './moving-car.css'
import './new.css'
import reactIcon from './assets/React.png'
import quillIcon from './assets/quill.png'
import carIcon from './assets/Img_05.png'
import agricultureIcon from './assets/agriculture.png'
import pigIcon from './assets/pig.png'
export class Landing extends Component {



    render() {
        
       
        return (
            <div className="landing" style={{minHeight: "100vh",backgroundColor: "white"}}>

<div className="banner">
        <div className="in">
            <h1>Check Out Blogs on Food, Medicine, Travel and many more topics!</h1>
            <Link to="/posts" className="btn-outline">Browse Blogs</Link>
          
        </div>
        <div className="sidebar">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-linkedin-in"></i>
        </div>
    </div>

    
        <div className="about">
            <div className="cat"><img src={agricultureIcon}/> 
             <section>
                 <h3>MERN Stack</h3>
                 <p>Free shipping on all order</p>
             </section></div>
            <div className="cat"><img src={pigIcon}/>
             <section>
                 <h3>Socket.io</h3>
                 <p>Realtime updates of posts</p>
             </section>
             </div>
            <div className="cat"><img src={agricultureIcon}/>
             <section>
                 <h3>Redux</h3>
                 <p>Central state management</p>
             </section>
             </div>
            <div className="cat"><img src={agricultureIcon}/>
             <section>
                 <h3>Quill Editor</h3>
                 <p>Best text editor for react</p>
             </section>
             </div>
        </div>
  
    <div className="moving-car">
        <div className="sky">
            <div className="surface"></div>
            <div className="car"><img src={carIcon} /></div>
        </div>
        <div className="banner-text">
            <h1>Use Quill Editor to write up amazing blogs with links, image and video uploading features!</h1>
            <div className="text-img"><img  src={quillIcon} /><img src={reactIcon} /></div>
            <a style={{marginTop: "20px"}} href="" className="btn-outline">Sign Up</a>
        </div>
    </div>

        </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{logout})(Landing)
