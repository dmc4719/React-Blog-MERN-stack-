import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {create_Post} from '../../store/actions/postActions'

import Axios from 'axios'
import './static/create_post.css'


export class Create_Posts extends Component {
    token = localStorage.getItem('auth_token')
    constructor(props) {
        super(props)
    
        this.state = {
             title: '',
             content: '',
             postImage: '',
             isloading: true,
             error: {}
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onFileChange = this.onFileChange.bind(this);
        
        
    }
    static getDerivedStateFromProps(nextProps,prevState){
        if(JSON.stringify(nextProps.post.errors) !== JSON.stringify(prevState)){
            
            return {
                error: nextProps.post.errors
            }
        }
    }


    onSubmit(e){
        e.preventDefault()
        const {title,content} = this.state
        let image = ''
        const formData = new FormData()
        formData.append('postImage', this.state.postImage)
        Axios.post("/api/auth/posts/upload_post_image",formData,{})
        .then(json=> {
            image = json.data.postImage
            this.props.create_Post({title,content,image},this.props.history,this.props.auth.user)
        })

    }

    inputChangeHandler(e,editor){
    
        // if(e.target!== undefined){
            this.setState({
                [e.target.name] : e.target.value
            })
        // }
       
        // else{
        //     this.setState({
        //         content : editor.getData()
        //     })
        // }
    }

    
    onFileChange(e){
        this.setState({
            postImage: e.target.files[0]
        })
    }

    
    render() {
          

      
        return (
            <div className="text-center  main-div">
                {this.token?
                 '': this.props.history.push('/posts')   
                }
                <div className="create_post">
                <h3 className="m-4">Create a Blog post</h3>
                <div className="danger-link">{this.state.error? <p>{this.state.error.error}</p>:''}</div>
                
                <form onSubmit={this.onSubmit} >
                <input onChange={this.inputChangeHandler} className="form-control" name="title" placeholder="Title"/>
                {/* <CKEditor  editor = {classicEditor}  onChange={this.inputChangeHandler}  /> */}
                <textarea  name ="content" className="form-control"  onChange={this.inputChangeHandler}  placeholder="write some text"/>
               
                <input type="file"  onChange={this.onFileChange}/>
                <button type="submit" className="btn btn-primary m-4">Create Post</button>
                <Link to='/posts'><button  className="btn btn-primary m-4">Go back to Posts</button></Link>
                </form>
          
                </div>
             
                           
                       
                        
            </div>
        )
    }
}

const mapStateToProps = state =>({
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps,{create_Post})(Create_Posts)
