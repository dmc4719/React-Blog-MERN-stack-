import Axios from 'axios'

const setAdminToken = token => {
    if(token){
        Axios.defaults.headers.common['Admin_Authorization'] = token
    }
    else{
        Axios.defaults.headers.common['Admin_Authorization'] = ''
    }
}
export default setAdminToken