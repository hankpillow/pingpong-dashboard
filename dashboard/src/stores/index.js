import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import {filterSample, filterError} from 'modules/data'

import api from './apiReducer'
import data from './dataReducer'

const samples = data(filterSample)
const errors = data(filterError)

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ ?
			compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()) :
			applyMiddleware(thunk)

const reducers = combineReducers({api, samples, errors})
const store = createStore(reducers, {}, middleware)

export default store

