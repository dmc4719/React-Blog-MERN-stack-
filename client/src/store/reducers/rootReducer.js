import {combineReducers} from 'redux'
import authReducer from './authReducer'
import adminReducer from './adminReducer'
import postReducer from './postReducer'
import commentReducer from './commentReducer'

 const rootReducer = combineReducers({
     auth: authReducer,
     admin:adminReducer,
     post: postReducer,
     comment: commentReducer
})

export default rootReducer






