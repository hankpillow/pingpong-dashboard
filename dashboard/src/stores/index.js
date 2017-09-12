import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'

import api from './apiReducer'
import error from './errorReducer'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ ?
			compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()) :
			applyMiddleware(thunk)

const reducers = combineReducers({api, error})
const store = createStore(reducers, {}, middleware)

export default store

