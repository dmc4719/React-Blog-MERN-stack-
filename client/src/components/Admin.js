import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {adminlogin} from '../store/actions/adminActions'
import './logReg.css'
 
export class Admin extends Component {
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
            <div className=" cont "  >
            <div className="d-log">
            <h2 className="m-2 ">Admin sign in</h2>
            
                <input name="email" placeholder="Email" className="form-control m-2 "   onChange={this.inputChangeHandler}/>
                
                <input name="pass" placeholder="Password" className="form-control m-2 " onChange={this.inputChangeHandler}/>

                <a href="#" onClick={this.onSubmit} style={{marginTop: "20px"}} href="" className="login-btn">Login</a>
            </div>
            
            
        </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin
})
export default connect(mapStateToProps,{adminlogin})(Admin)
