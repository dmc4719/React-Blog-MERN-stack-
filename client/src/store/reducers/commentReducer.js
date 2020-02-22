import * as Types from './../actions/types'

const init = {
    comment_data : {},
    errors: {},
    message: ''
}

const commentReducer = (state=init,action) => {
    switch(action.type){
        case Types.CREATE_COMMENT:{
            return{
                ...state,
                comment_data: action.payload.comment_data,
                
            }
        }
        case Types.DELETE_COMMENT:{
            return{
                ...state,
                message: action.payload.message
                
            }
        }
        case Types.UPDATE_COMMENT: {
            return{
                    ...state,
                    message: action.payload.message
            }
        }
        case Types.COMMENT_ERROR:{
            return{
                ...state,
                errors: action.payload.error
            }
        }
        default: return state
    }
        
}

export default commentReducer