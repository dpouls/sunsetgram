import {createStore, combineReducers,applyMiddleware} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import postReducer from './postReducer'

const rootReducer = combineReducers({
    userReducer,
    postReducer
})



export default createStore(rootReducer,
    applyMiddleware(reduxPromiseMiddleware)
    )