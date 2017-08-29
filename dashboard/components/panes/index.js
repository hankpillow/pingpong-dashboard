import {h} from 'preact'
import {connect} from 'preact-redux'

import ErrorCard from './ErrorCard'

const Panes = ({samples, errors}) => {

	if (samples.length == 0 && errors.length === 0) return 'nothing to show'

	if (samples.length + errors.length === 0){
		return (<span>¯\_(ツ)_/¯</span>)
	}

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
		samples:state.samples,
		errors:state.errors
	}
}, () => ({}))(Panes)
