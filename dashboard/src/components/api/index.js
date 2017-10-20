import {connect} from 'preact-redux'
import {h} from 'preact'

import SelectTime from './SelectTime'

const API = ({busy, errorMessage}) => {

	const status = busy ? 'loading...' : 'ready'

	if (errorMessage != '') return (<span>{errorMessage}</span>)

	return (<div>
			<div className={'status'}>
				<span>{status}</span>
			</div>
			<SelectTime />
		</div>
	)
}

export default connect(state => {
	return {
		busy: state.api.busy,
		errorMessage: state.api.message
	}
}, () => ({}))(API)

