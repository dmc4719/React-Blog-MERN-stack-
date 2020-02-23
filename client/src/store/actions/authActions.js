import jwtDecode from 'jwt-decode'
import Axios from 'axios'
import * as Types from './types'
import setAuthToken from './../../utils/setAuthToken'


export const login = (user,history) => dispatch => {

    Axios.post('/api/auth/login',user)
    .then(user=>{
        console.log(user)
        let decode = jwtDecode(user.data.token)
       localStorage.setItem('auth_token',user.data.token)
       
        setAuthToken(user.data.token)
        dispatch({
            type: Types.SET_USER,
            payload: {
                user:decode
            }
        })
        // localStorage.removeItem('auth_token')
        history.push('/')
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

export const register = (user, history) => dispatch => {
    Axios.post('/api/auth/register',user)
    .then(user=>{
        console.log(user)
       
        dispatch({
            type: Types.CREATE_USER,
            payload: {
                createdUser:user
            }
        })
        history.push('/')
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

export const logout = history => {
    localStorage.removeItem('auth_token')
    setAuthToken()
    history.push('/login')
    return {
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    }
}