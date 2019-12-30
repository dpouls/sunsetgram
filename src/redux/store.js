import {createStore, combineReducers} from 'redux';
// import promiseMiddleware from 'redux-promise-middleware'
import userReducer from './userReducer'
import postReducer from './postReducer'

const rootReducer = combineReducers({
    userReducer,
    postReducer
})

export default createStore(rootReducer)