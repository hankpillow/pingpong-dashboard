import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import {combineReducers} from 'redux'

import statusReducer from 'comp/AppStatus/reducer'
import timeReducer from 'comp/TimeRange/reducer'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ ?
			compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()) :
			applyMiddleware(thunk)

const store = createStore(combineReducers({
	appStatus: statusReducer,
	timeRange: timeReducer
}), {}, middleware)

export default store

