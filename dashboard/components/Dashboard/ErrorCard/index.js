import {h} from 'preact'
import {Provider, connect} from 'preact-redux'
import {createStore} from 'redux'
import reducer from './reducer'

import ErrorTable from 'insights/ErrorTable'
import DataGroup from 'insights/DataGroup'

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
			<span>Group data by:</span> <DataGroup />
			<ErrorTable />
		</div>
	</Provider>)
}

export default connect(state => ({data:state.api.errors}), () => ({}))(ErrorCard)
