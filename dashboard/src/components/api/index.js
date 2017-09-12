import {connect} from 'preact-redux'
import {h} from 'preact'

import SelectTime from './SelectTime'

const API = ({busy}) => {
	return (<div>
			<div className={'status'}>
				<span>api: {busy ? 'loading...' : 'ready'}</span>
			</div>
			<SelectTime />
		</div>
	)
}

export default connect(state => {
	return {busy:state.api.busy}
}, () => ({}))(API)

