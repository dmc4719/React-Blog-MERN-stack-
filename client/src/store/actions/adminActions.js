import jwtDecode from 'jwt-decode'
import Axios from 'axios'
import * as Types from './types'


export const adminlogin = (user,history) => dispatch => {

    Axios.post('/api/admin/login',user)
    .then(user=>{
        console.log(user)
        let decode = jwtDecode(user.data.token)
       localStorage.setItem('admin_token',user.data.token)
        console.log(decode)
        dispatch({
            type: Types.SET_ADMIN,
            payload: {
                admin:decode
            }
        })
        // localStorage.removeItem('auth_token')
        history.push('/admin/home')
    })
    .catch(error=>{
        if(error){
            console.log(error.response.data)
            dispatch({
                type: Types.ADMINS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        }
        
        
    })

}

export const logout = history => {
    console.log("in logout")
    localStorage.removeItem('admin_token')
    history.push('/admin')
    return {
        type: Types.SET_ADMIN,
        payload: {
            admin: {}
        }
        
    }
    
}