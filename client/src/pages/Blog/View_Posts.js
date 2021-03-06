import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import './static/blog.css'
import {delete_Post,update_Post} from '../../store/actions/postActions'
import rhtml from 'react-html-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'react-moment';

import io from 'socket.io-client'
import { message } from 'antd'

const socketUrl ="http://localhost:5000"

var Url = window.location.protocol + '//' + window.location.host

const socket =  io(Url + '/')


export class View_Posts extends Component {
    token = localStorage.getItem('auth_token')
    constructor(props) {
        super(props)
        
    
        this.state = {
             posts:[],
             isloading: true,
             user: {},
             socket: {},
             isLoading: true
        }
        this.onDeleteHandler = this.onDeleteHandler.bind(this)
        this.initSocket = this.initSocket.bind(this)
    }
  
    componentDidMount(){
        fetch('/api/auth/posts/')
        .then(res=>res.json())
        .then(posts=>{
           
            this.setState({posts,isloading:false,user:this.props.auth.user})
             })

            this.initSocket()
         
     }


    initSocket = ()=> {
        console.log(socket)
        socket.on('posts',posts =>{
            console.log(posts)
            
            this.setState({posts,isLoading:false})
        } )

    }


    onDeleteHandler(id){
        this.props.delete_Post(id,this.props.history)
    }

   
    
    render() {
        
        const {posts,isLoading} = this.state

        if(isLoading){
            message.loading('Loading')
        }
        else{
            message.success('Posts Loaded',1)
        }
        
        var check = false;
         
        var pp 
        
       if(posts){

            pp = posts.map((post)=><div key={post._id} className="post ">
           
            <div className="thumbnail"><img className="p-img"  src={ `${Url}/${post.image}`} alt="nothing"/></div>
            <div className="blog">
            <div className="post-title ">
                <Link style={{textDecoration:"none"}} to={'/posts/' + post._id}><h5 style={{cursor:"pointer",display: "inline",}} className="title" >{post.title}</h5></Link>

                {this.props.auth.user._id === post.user._id?   <p style={{cursor:"pointer",display: "inline-block",color:"white !important"}} className="ml-2" onClick={()=> this.onDeleteHandler(post._id)}>
                    <FontAwesomeIcon icon={['fas','trash']} style={{ color: "white"}}/></p> : ''}
                </div>
            
            <div className="writer" style={{ display: "inline-block" }}>
                {/* <small className="text-muted mx-2">Written By {post.user.name}</small>  */}
                <small style={{"color":"white"}}><Moment>{post.timestamps}</Moment></small>
                </div>
            <div className="text content">{rhtml(post.content.replace("http://localhost:5000/", window.location.protocol+'//'+window.location.host + '/'))}</div>
            </div>
         
              
        </div>)
       }


        if(this.state.isloading){
            return (<div className="text-center m-4">...Loading</div>)
        }

        if(this.props.auth.isAuthenticated  && this.token){
            check = true;
        }
        return (
            <div className="text-center wr-posts">
                
                <h3 className="p-2">Blog Posts</h3>
                {this.state.posts.length ? '':<h5 className="m-4">No Post Found!</h5> }
                <div className="Blogs">
                {pp}
                </div>
                {
                   check?
                    <Link to="/posts/create_post"><button className="btn btn-primary mb-4">Create Post</button></Link>: ''
                   }

            </div>
        )
    }
}

        const mapStateToProps = state =>({
            auth: state.auth
        })

export default connect(mapStateToProps,{delete_Post,update_Post})(View_Posts)
