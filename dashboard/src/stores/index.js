import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'

import api from './apiReducer'
import errors from './errorReducer'
import samples from './samplesReducer'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ ?
			compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()) :
			applyMiddleware(thunk)

const reducers = combineReducers({api, samples, errors})
const store = createStore(reducers, {}, middleware)

export default store

