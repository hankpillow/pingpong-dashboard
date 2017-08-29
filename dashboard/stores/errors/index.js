import {createStore} from 'redux'
import reducer from 'components/panes/ErrorCard/reducer'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined

export default data => {
	return createStore(reducer, data, middleware)
}
