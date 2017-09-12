import {h} from 'preact'
import {connect} from 'preact-redux'

import ErrorTable from 'insights/ErrorTable'
import DataGroup from 'insights/DataGroup'

const ErrorCard = ({data}) => {
	return (<div className={'error-wrapper'}>
			<h3>Error list {data.length ? `(${data.length})` : ''}</h3>
			{data.length > 0 && 
				<p>
				Group data by:
				<DataGroup />
			</p>
			}
			<ErrorTable />
		</div>)
}

export default connect(state => {
	return {data: state.error.data}
}, null)(ErrorCard)
