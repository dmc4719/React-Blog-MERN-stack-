import Axios from 'axios'
import * as Types from './types'



export const Comment = (commentInfo, history)=> dispatch => {

    Axios.post('/api/auth/comments/post_comment',commentInfo)
    
    .then(json => {
        console.log(json.data)
        dispatch({
            type: Types.CREATE_COMMENT,
            payload: {
                comment_data: json.data
            }
        })
        history.go(`/posts/${commentInfo.post}`)
    })
    .catch(error=>{
        if(error){
           
            dispatch({
                type: Types.COMMENT_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        }
        
        
    })

}


export const deleteComment = (id,history)=> dispatch => {
    Axios.delete('/api/auth/comments/delete_comment?id=',id)
    .then(json => {
        dispatch({
            type: Types.CREATE_COMMENT,
            payload: {
                message: json.response.data
            }
        })
    })
    .catch(error=>{
        if(error){
            console.log(error.response.data)
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        }
        
        
    })
    
}


export const editComment = (id,history)=> dispatch => {


    
}