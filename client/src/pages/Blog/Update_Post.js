import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {connect} from 'react-redux'
import {update_Post} from './../../store/actions/postActions'

export class Update_Post extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             title: '',
             content: '',
             errors: {},
             postImage: ''
        }
        this.onFileChange = this.onFileChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
    }

    inputChangeHandler(e){
        console.log(e.target.value)
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onFileChange(e){
        this.setState({
            postImage: e.target.files[0]
        })
    }
    
    onSubmit(e){
        e.preventDefault()
        const {title,content} = this.state
        const postId = this.props.match.params.post_id
        let image = ''
        const formData = new FormData()
        formData.append('postImage', this.state.postImage)
        Axios.post("/api/auth/posts/update_post_image",formData,{})
        .then(json=> {
            image = json.data.postImage
            this.props.update_Post({title,content,image,postId},this.props.history)
        })
    }
    componentDidMount(){
   
    }
    
    render() {
        
        return (
            <div className="container text-center">
                 
                <div className="create_post">
                <h3 className="m-4">Create a Blog post</h3>
                <div className="danger-link">{this.state.error? <p>{this.state.error.error}</p>:''}</div>
                
                <form onSubmit={this.onSubmit} >
                <input onChange={this.inputChangeHandler} className="form-control" name="title" placeholder="Title"/>
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

const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps,{update_Post})(Update_Post)
