import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'

import api from 'components/api/SelectTime/reducer'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ ?
			compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()) :
			applyMiddleware(thunk)

const store = createStore(api, {}, middleware)

export default store

