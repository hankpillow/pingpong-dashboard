import {h} from 'preact'
import {connect} from 'preact-redux'

import ErrorTable from 'insights/ErrorTable'
import DataGroup from 'insights/DataGroup'

const ErrorCard = ({data}) => {
	const msg = data.length ? data.length : ''
	return (<div className={'error-wrapper'}>
			<h3>Error list {msg}</h3>
			{data.length > 0 && <p>
				Group data by:
				<DataGroup />
			</p>}
			<ErrorTable />
		</div>)
}

export default connect(state => {
	return {data: state.error.data}
}, null)(ErrorCard)
