import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './store'
import jwtDecode from 'jwt-decode'
import * as Types from './store/actions/types'
import setAuthToken from './utils/setAuthToken'
import setAdminToken from './utils/setAdminToken'






const token = localStorage.getItem('auth_token')
if(token){
    let decode = jwtDecode(token)
   
    setAuthToken(token)
    store.dispatch({
        type: Types.SET_USER,
        payload: {
            user: decode
        }
    })
}
const admintoken = localStorage.getItem('admin_token')
if(admintoken){
    let decode = jwtDecode(admintoken)
   console.log(admintoken,decode)
    setAdminToken(admintoken)
    store.dispatch({
        type: Types.SET_ADMIN,
        payload: {
            admin: decode
        }
    })
}

ReactDOM.render(
    <Provider store ={store} >
    <App/>
    </Provider>,
     document.getElementById('root'));


serviceWorker.unregister();
