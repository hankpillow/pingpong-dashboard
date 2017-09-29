import {connect} from 'preact-redux'
import {h} from 'preact'

import SelectTime from './SelectTime'

const API = ({busy}) => {

	const status = busy ? 'loading...' : 'ready'

	return (<div>
			<div className={'status'}>
				<span>{status}</span>
			</div>
			<SelectTime />
		</div>
	)
}

export default connect(state => {
	return {busy:state.api.busy}
}, () => ({}))(API)

