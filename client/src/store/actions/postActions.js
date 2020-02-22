import Axios from 'axios'
import * as Types from './types'
// import io from 'socket.io-client'
// const socketUrl = 'http://localhost:5000'


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
         
          history.push('/posts')
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
    
    
    history.go('/posts')
    
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


export const update_Post = (id,history) => dispatch => {
  Axios.put('/api/auth/posts/update_post?id=?'+id)
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