import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
import {login} from './../store/actions/authActions'
import './logReg.css'
 
export class Login extends Component {
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

    static getDerivedStateFromProps(nextProps,prevState){
        if(JSON.stringify(nextProps.auth.errors) !== JSON.stringify(prevState)){
            
            return {
                error: nextProps.auth.errors
            }
        }
    }
    inputChangeHandler(e){
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const {email,pass} = this.state
        this.props.login({email,pass},this.props.history)
    }
    
    render() {
        if(this.props.auth.isAuthenticated){
            return <Redirect to='/'   />
        }
        const style={display:"flex",verticalAlign: "middle",}
       
        return (
            <div className=" cont "  >
                <div className="d-log">
               
                <h2 className="m-2 ">Sign In</h2>
                
                    <input name="email" placeholder="email" className="form-control m-2 " onChange={this.inputChangeHandler}/>
                    <input name="pass" placeholder="pass" className="form-control m-2 " onChange={this.inputChangeHandler}/>
                    <Link><small style={{marginLeft: "-150px"}}>Don't Have an account?</small></Link>
                    <button onClick={this.onSubmit} className="btn btn-outline-danger m-3 ">Login</button>
                </div>
                
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth : state.auth
})
export default connect(mapStateToProps,{login})(Login)
