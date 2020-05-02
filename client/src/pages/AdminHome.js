import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from './../store/actions/adminActions'
import './../components/logReg.css'

export class AdminHome extends Component {
    render() {
        return (
            <div style={{margin: "200px auto",textAlign: "center"}}>
            <h2>Welcome to Admin page</h2>
            {
            this.props.admin.isAdmin? 
            
            <a onClick={()=>this.props.logout(this.props.history)} style={{marginTop: "20px",margin: "auto",display:"block"}} href="" className="login-btn">Logout</a>
            :
            <Redirect to ='/admin' />
            }
        
            
        </div>
        )
    }
}


const mapStateToProps = state => ({
    admin: state.admin
})

export default connect(mapStateToProps,{logout})(AdminHome)
