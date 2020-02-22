import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {adminlogin} from './../store/actions/adminActions'
import './../App.css'
 
export class adminLogin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             pass: '',
             user: {},
             error: {}
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    // static getDerivedStateFromProps(nextProps,prevState){
    //     if(JSON.stringify(nextProps.auth.errors) !== JSON.stringify(prevState)){
            
    //         return {
    //             error: nextProps.auth.errors
    //         }
    //     }
    // }
    inputChangeHandler(e){
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const {email,pass} = this.state
        this.props.adminlogin({email,pass},this.props.history)
    }
    
    render() {
        if(this.props.admin.isAdmin){
            return <Redirect to='/admin/home'   />
        }
       
        return (
            <div className="d-log container">
                <h2 className="m-2 col-md-4">Admin Sign In</h2>
                <form className="" onSubmit={this.onSubmit}>
                    <input name="email" placeholder="email" className="form-control m-2 " onChange={this.inputChangeHandler}/>
                    <input name="pass" placeholder="pass" className="form-control m-2 " onChange={this.inputChangeHandler}/>
                    <button type="submit" className="btn btn-outline-primary m-2 ">Login</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin
})
export default connect(mapStateToProps,{adminlogin})(adminLogin)
