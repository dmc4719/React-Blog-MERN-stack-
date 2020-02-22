import * as Types from './../actions/types'
const init = {
    post_data: {},
    errors: {}
}


const postReducer = (state=init,action) => {


    switch(action.type){
        case Types.CREATE_POST: {
            return {
                post_data: action.payload.post_data,
                errors: {}
            }
        }
        case Types.DELETE_POST: {
            return {
                post_data: action.payload.deleted_post,
                errors: {}
            }
        }
        case Types.UPDATE_POST: {
            return {
                post_data: action.payload.updated_post,
                errors: {}
            }
        }
        case Types.POSTS_ERROR: {
            return {
                ...state,
                errors: action.payload.error
            }
        }
        default : return state
        
    }
}
export default postReducer