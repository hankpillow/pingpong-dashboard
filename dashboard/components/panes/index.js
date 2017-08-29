import {h} from 'preact'
import {connect} from 'preact-redux'

import ErrorCard from './ErrorCard'

const Panes = ({samples, errors}) => {
	return (<div className={'dashboard'}>
				<ul>
					<li>samples: {samples.length}</li>
					<li>error: {errors.length}</li>
					<li>total:{errors.length + samples.length}</li>
				</ul>
				<ErrorCard/>
			</div>)
}

export default connect(state => {
	return {
		samples:state.api.samples,
		errors:state.api.errors
	}
}, () => ({}))(Panes)
