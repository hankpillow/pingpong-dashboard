import {h} from 'preact'
import {connect} from 'preact-redux'
import nd from 'stores/nd'

import ErrorTable from 'insights/ErrorTable'
import DataGroup from 'insights/DataGroup'

const ErrorCard = ({data}) => {

	if (!data || (data && data.length === 0)){
		return (<div className={'error-wrapper'}>
			<h3>
				Error list
				<p>Oki doki!</p>
			</h3>
			<span>Seems that your log has no error!</span>
		</div>)
	}

	return (<div className={'error-wrapper'}>
			<h3>Error list ({data.length})</h3>
			<p>
				Group data by:
				<DataGroup />
			</p>
			<ErrorTable />
		</div>)
}

export default connect(state => ({
	data: state.error.data
}), nd)(ErrorCard)
