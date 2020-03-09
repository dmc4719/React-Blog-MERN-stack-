import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {create_Post} from '../../store/actions/postActions'
import QuillEditor from './../../components/editor/QuillEditor'
import Axios from 'axios'
import './static/blog.css'
import {message} from 'antd'

export class Create_Posts extends Component {
    token = localStorage.getItem('auth_token')
    constructor(props) {
        super(props)
    
        this.state = {
         

             title: '',
             content: '',
             error: '',
             errors:{},
             postImage: '',
             files: ''
        }
    

        this.onFilesChange = this.onFilesChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.titleChangeHandler = this.titleChangeHandler.bind(this)
        this.onEditorChange = this.onEditorChange.bind(this)
        this.onFileChange = this.onFileChange.bind(this);
        
        
    }
    static getDerivedStateFromProps(nextProps,prevState){
        if(JSON.stringify(nextProps.post.errors) !== JSON.stringify(prevState)){
            
            return {
                errors: nextProps.post.errors
            }
        }
    }


    onSubmit(e){
        e.preventDefault()
       
        const {title,content,error,postImage} = this.state

        if(title  === ''|| content === '' || postImage === ''){
            this.setState({
                error: 'Title, Image or Content Field cannot be left empty'
            })
            return
        }
        let image = ''
        const formData = new FormData()
        formData.append('postImage', this.state.postImage)
        Axios.post("/api/auth/posts/upload_post_image",formData,{})
        .then(json=> {
            image = json.data.postImage
            this.props.create_Post({title,content,image},this.props.history,this.props.auth.user)
        })

    }
    titleChangeHandler(e){   
        this.setState({
          title : e.target.value
        })
    }

    onEditorChange = (value) => {
        this.setState({
            content: value
        })
    }


    onFilesChange(files){       
        this.setState({
            files: files
        })
        
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
                <div className="danger-link">{this.state.error? <p>{this.state.error}</p>:''}</div>
                
                

                <input onChange={this.titleChangeHandler} className="form-control" name="title" placeholder="Title"/>
                
               
                <input className="m-4" type="file"  onChange={this.onFileChange}/>
                <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={this.onEditorChange}
                onFilesChange={this.onFilesChange}
                 />
                
                <button onClick={this.onSubmit} className="btn btn-primary m-4">Create Post</button>
                <Link to='/posts'><button  className="btn btn-primary m-4">Go back to Posts</button></Link>
                
                
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
