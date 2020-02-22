import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import './static/blog.css'
import {delete_Post} from './../../store/actions/postActions'
import rhtml from 'react-html-parser'
import io from 'socket.io-client'
const socketUrl = 'http://localhost:5000/'
const socket =  io(socketUrl)



export class view_Posts extends Component {
    token = localStorage.getItem('auth_token')
    constructor(props) {
        super(props)
        
    
        this.state = {
             posts:[],
             isloading: true,
             user: {},
             socket: {}
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
        socket.on('connection',() => {
            this.setState({socket})
        })
        socket.on('posts',posts =>{
            console.log(posts)
            this.setState({posts})
        } )

    }


    onDeleteHandler(id){
        this.props.delete_Post(id,this.props.history)
    }

   
    
    render() {
        var check = false;
        
        const posts = this.state.posts
        const pp = posts.map((post)=><div key={post._id} className="post m-4 ">
            <span className="thumbnail"><img className="p-img mb-2"  src={post.image} alt="nothing"/></span>

            <div >
                <Link style={{textDecoration:"none"}} to={'/posts/' + post._id}><h5 style={{cursor:"pointer",display: "inline",}} className="mx-2 title" >{post.title}</h5></Link>

                {this.props.auth.user._id === post.user._id?   <p style={{cursor:"pointer",display: "inline-block",color:"white !important"}} className="" onClick={()=> this.onDeleteHandler(post._id)}>X</p> :''}
                </div>
            
            <div style={{ display: "inline-block" }}>
                <small className="text-muted mx-2">Written By {post.user.name}</small> 
                <p style={{cursor:"pointer",display: "inline-block"}} onClick={()=> this.onUpdateHandler(post._id)}> + </p> 
                </div>
            <div className="text text-center content">{rhtml(post.content)}</div>
              
        </div>)

        if(this.state.isloading){
            return (<div className="text-center m-4">...Loading</div>)
        }

        if(this.props.auth.isAuthenticated  && this.token){
            check = true;
        }
        return (
            <div className="text-center wr-posts">
                
                <h3 className="m-4">Blog Posts</h3>
                <div className="">
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

export default connect(mapStateToProps,{delete_Post})(view_Posts)
