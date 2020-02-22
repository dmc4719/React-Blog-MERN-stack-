import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from './../store/actions/authActions'
import './landing.css'

export class Landing extends Component {



    render() {
        
       
        return (
            <div className="landing" style={{paddingTop:"100px", textAlign: "center",minHeight: "100vh",backgroundColor: "white",marginBottom:"-200px"}}>
            <h2 >Welcome to our landing page</h2>
            {
            this.props.auth.isAuthenticated? 
            <button  className="btn btn-outline-danger m-2"  onClick={()=>this.props.logout(this.props.history)}>Logout</button> :
            <Link to='/login'><button className="btn btn-primary m-2">Login</button></Link>
            }

            <Link to='/posts'><button className="btn btn-success m-2">Blog</button></Link>
        </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{logout})(Landing)
