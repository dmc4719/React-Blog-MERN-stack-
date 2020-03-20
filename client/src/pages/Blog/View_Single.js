import React, { Component } from 'react'
import Axios from 'axios'
import rhtml from 'react-html-parser'
import  './static/blog.css'
import {connect} from 'react-redux'
import {Comment} from './../../store/actions/commentActions'
import Moment from 'react-moment';
import {Link} from 'react-router-dom'
import io from 'socket.io-client'
import { message } from 'antd'
const socketUrl ="http://localhost:5000/"
// const socketUrl = "/"
var Url = window.location.protocol + '//' + window.location.host
// const socket =  io(socketUrl)
const socket =  io(Url + '/')



export class View_Single extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id: null,
             post: {},
             comment: '',
             comments: [],
             error:'',
             errors: {},
             postUser: {},
             isLoading: true
        }
      
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.clearStateErrors = this.clearStateErrors.bind(this)
        this.initSocket = this.initSocket.bind(this)
    }
    static getDerivedStateFromProps(nextProps,prevState){
        if(JSON.stringify(nextProps.comment.errors) !== JSON.stringify(prevState)){
            
            return {
                
                errors: nextProps.comment.errors
            }
        }
    }

    onChange(e){
       
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    clearStateErrors(e){
        e.preventDefault()
        
        this.setState({error:null,errors: null})
    
    }
    onSubmit(e){
        e.preventDefault()
        const {comment} = this.state
      
        let post = this.props.match.params.post_id
        this.props.Comment({comment,post},this.props.history)
    }


    initSocket = ()=> {
      
        socket.on('comments',comments =>{
            
            this.setState({comments})
        } )

    }
   
   
    componentDidMount(){
        let id = this.props.match.params.post_id
        this.setState({id})
        Axios.get(`/api/auth/posts/${id}`)
        .then(post=>{
            Axios.get(`/api/auth/comments/${id}`)
            .then(comments=>{
                
                this.setState({comments:comments.data})
                 })
                 .catch(error => console.log(error))
                 
            this.setState({
                post:post.data,
                postUser:post.data.user,
                isLoading:false})
            }
           )
           .catch(error=> console.log(error))
            this.initSocket()
    }

    
   
 
    render() {
     
        const {post,comments,postUser,isLoading} = this.state
                     const comm = comments.map((com)=> <div key={com._id} className="comment_div">
                         <img src={`${Url}/${com.user.image}`} alt="user"/>
                         <div className="comment"><h5 >{com.user.name} - (<Moment format="YYYY/MM/DD">{com.timestamps}</Moment>)</h5>
                     <p>{com.comment}</p></div>
                         
                         
                     </div>)

        if(isLoading){
            message.loading('Loading',0)
        } else{
            
            message.success('Post Loaded',1)
        }    

        var newStr = ''
        if(post.content){
             newStr = post.content.replace("http://localhost:5000/", window.location.protocol+'//'+window.location.host + '/')
          
        }      
       
       
       
    
        return (
            
            <div className="single_post_page ">
                
                <div className="single-post text-center pt-4">
               
                    <span className="img-container"> 
                    {post.image?  <img src={ `${Url}/${post.image}`} alt="" /> : ''}
                      
                    
                    </span>
                    <h5 className="m-2">Written By {postUser.name} </h5>
                    <Moment>{post.timestamps}</Moment>
                <h1 className="mt-4 title">{post.title}</h1>
                
               <div className=" container single-content " style={{marginBottom: "0px"}}>{rhtml(newStr)}</div>
               
               
               
                </div>
              
                <div className="comments mb-4 " >
                    <h3 style={{color: "darkslategray",fontSize: "21px"}}>COMMENTS :- </h3>
                    
                {comm}
                </div>

                {this.props.auth.isAuthenticated? 
                
                <div className=" comment-box ">

                <h5 style={{marginTop:"30px",marginBottom:"0px"}}>Post your comment</h5>
                {this.state.errors? <p style={{color: "red",fontWeight: "bold",fontFamily:'montserrat'}}>{this.state.errors.error}</p> :''}
                
                <textarea onClick={this.clearStateErrors} className="form-control" value={this.state.comment} name="comment" onChange={this.onChange}/>
                <button  onClick={this.onSubmit} className="btn btn-outline-primary">Comment!</button>
            </div>:<Link to="/login"><h5 style={{textAlign:"center", marginBottom: "20px"}}>Login to Comment!</h5></Link>
            }
                
                
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
auth : state.auth,
comment : state.comment
})

export default connect(mapStateToProps,{Comment})(View_Single)
