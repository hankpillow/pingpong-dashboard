import {h} from 'preact'
import {Provider, connect} from 'preact-redux'
import store from 'stores/errors'
import nd from 'stores/nd'

import ErrorTable from 'insights/ErrorTable'
import DataGroup from 'insights/DataGroup'

const ErrorCard = ({data, samples}) => {

	if (!data || (data && data.length === 0)){
		return (<div className={'error-wrapper'}>
			<h3>Oki doki!</h3>
			<span>Seems that your log has no error!</span>
		</div>)
	}

	const errorStore = store(data)
	const loss = (data.length / samples * 100).toPrecision(2)

		return (<Provider store={errorStore}>
			<div className={'error-wrapper'}>
				<h3>Error list ({data.length})</h3>
				<sub>{loss}% of the tries were errors!</sub>
				<p>
					Group data by:
					<DataGroup />
				</p>
				<ErrorTable />
			</div>
		</Provider>)
}

export default connect(state => ({
	data: state.errors,
	samples: state.samples.length
}), nd)(ErrorCard)
