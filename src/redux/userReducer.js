const initialState = {
    user: {}
}

const GET_USER = 'GET_USER'
const LOGOUT = "LOGOUT"

export function getUser(userObj){
    
    return { 
        type: GET_USER,
        payload: userObj
    }
}

export function logout(){
    return {
        type: LOGOUT,
        payload: null
    }
}

export default function userReducer(state = initialState, action){
    const {type,payload} = action
    console.log('UR Payload', payload)
    switch(type){
        case GET_USER:
            return {...state, user: payload}
            case LOGOUT: 
            return {...state, user: {}}
            default:
                return state;
            }
            
        }
        