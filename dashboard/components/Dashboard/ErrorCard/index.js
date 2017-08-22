import {h} from 'preact'
import {Provider, connect} from 'preact-redux'
import {createStore} from 'redux'
import reducer from './reducer'

import DataGrid from './DataGrid'
import DataGroup from './DataGroup'

const ErrorCard = ({data}) => {

	if (!data || (data && data.length === 0)){
		return (<div className={'error-wrapper'}>
			<h3>Oki doki!</h3>
			<span>Seems that your log has no error!</span>
		</div>)
	}

	const middleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
	const store = createStore(reducer, data, middleware)

	return (<Provider store={store}>
		<div className={'error-wrapper'}>
			<h3>Error list ({data.length})</h3>
			<DataGroup />
			<DataGrid />
		</div>
	</Provider>)
}

export default connect(state => ({data:state.api.errors}), () => ({}))(ErrorCard)
