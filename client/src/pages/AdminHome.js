import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from './../store/actions/adminActions'


export class AdminHome extends Component {
    render() {
        return (
            <div style={{marginTop: "200px",textAlign: "center"}}>
            <h2>Welcome to Admin page</h2>
            {
            this.props.admin.isAdmin? 
            <button  className="btn btn-outline-danger m-2"  onClick={()=>this.props.logout(this.props.history)}>Logout</button> :
            <Redirect to ='/admin' />
            }

            {/* <Link to='/auth/posts'><button className="btn btn-success m-2">Blog</button></Link> */}
        </div>
        )
    }
}


const mapStateToProps = state => ({
    admin: state.admin
})

export default connect(mapStateToProps,{logout})(AdminHome)
