import React, { Component } from 'react'
import Axios from 'axios'
import rhtml from 'react-html-parser'
import  './static/post.css'
import {connect} from 'react-redux'
import {Comment} from './../../store/actions/commentActions'
import io from 'socket.io-client'
const socketUrl = 'http://localhost:5000/'
const socket =  io(socketUrl)

export class View_Single extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id: null,
             post: {},
             comment: '',
             comments: [],
             error:'',
             errors: {}
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
        console.log('here')
        this.setState({error:null,errors: null})
    
    }
    onSubmit(e){
        e.preventDefault()
        const {comment} = this.state
        if(!this.props.auth.isAuthenticated){
            console.log('not logged in')
             this.setState({
                errors: "You need to be Logged in to Comment"
            })
            
            return
        }
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
        Axios(`/api/auth/posts/${id}`)
        .then(post=>{
            Axios(`/api/auth/comments/${id}`)
            .then(comments=>{
                
                this.setState({comments:comments.data})
                 })
            this.setState({post:post.data})
            }
           )
            this.initSocket()
    }

 
    render() {
      
        const {post,comments} = this.state
                     const comm = comments.map((com)=> <div key={com._id} className="comment"><p >{com.user.name} </p>
                     <p>{com.comment}</p>
                     </div>)
       
        
        return (
            
            <div className="single_post_page">
                <div className="single-post text-center p-4 ">
               
                    <span className="img-container"> 
                    <img src={post.image} alt="" />
                    </span>
                <h3 className="mt-4">{post.title}</h3>
               <div style={{}} className=" container single-content mb-4">{rhtml(post.content)}
               
               </div>
               
                </div>
              
                <div className="comments" >
                    <h3 style={{color: "darkslategray",fontSize: "21px"}}>COMMENTS :- </h3>
                    
                {comm}
                </div>
                
                <div className=" comment-box ">

                    <p style={{marginTop:"10px"}}>Post your comment</p>
                    {this.state.errors? <p style={{color: "red",fontWeight: "bold",fontFamily:'montserrat'}}>{this.state.errors.error}</p> :''}
                    <textarea onClick={this.clearStateErrors} className="form-control" value={this.state.comment} name="comment" onChange={this.onChange}/>
                    <button  onClick={this.onSubmit} className="btn btn-outline-primary">Comment!</button>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
auth : state.auth,
comment : state.comment
})

export default connect(mapStateToProps,{Comment})(View_Single)
