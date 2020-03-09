import Axios from 'axios'
import * as Types from './types'
import {message} from 'antd'


export const create_Post = (post,history,user) => dispatch => {
    Axios.post('/api/auth/posts/create_post',{post,user})
       
        .then(posts => {
          
          
          dispatch({
            type: Types.CREATE_POST,
            payload: {
                post_data: post,
                errors: {}
            }

          })
        message.success('Post Created!')
         setTimeout(()=>{
          history.push('/posts')
         },1000
         )
          
        })

        .catch(error=> {
            console.log(error.response.data)
           dispatch({
            type: Types.POSTS_ERROR,
            payload: {
                error: error.response.data
            }
           })
           })

}

export const delete_Post = (id,history) => dispatch => {
  Axios.delete('/api/auth/posts/delete_post?id='+id)
  .then(json =>{
    
    dispatch({
      type: Types.DELETE_POST,
      payload: {
        
        deleted_post: json.data
      }
      
    })
    message.success('Post Successfully Deleted!')
    
    setTimeout(()=> {
      window.location.reload()
    }, 2000)
    
    
  })

  .catch(error=> {
    
   dispatch({
    type: Types.POSTS_ERROR,
    payload: {
        error: error
    }
   })
   history.push('/posts')
   })
}


export const update_Post = (postInfo,history) => dispatch => {
  Axios.put('/api/auth/posts/update_post?id=?'+postInfo.postId, postInfo)
  .then(json => {
    dispatch({
      type: Types.UPDATE_POST,
      payload: {
        message: json.data.message,
        updated_post: json.data.update
      }
    })
    history.push('/posts')
  })
  .catch(error => {
      
    dispatch({
      type: Types.POSTS_ERROR,
      payload: {
        error: error.response.data
      }
    })
    
      

  })

} 