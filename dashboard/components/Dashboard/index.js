//libs
import {h} from 'preact'
import {connect} from 'preact-redux'

//modules
import {getUptime} from 'modules/insights'

//comps
import ErrorCard from './ErrorCard'

const Dashboard = ({samples, errors}) => {

	if (samples.length == 0 && errors.length === 0) return 'nothing to show'

	const uptime = getUptime(samples)

	if (samples.length + errors.length === 0){
		return (<span>¯\_(ツ)_/¯</span>)
	}

	return (<div className={'dashboard'}>
				<ul>
					<li>uptime: {parseInt(uptime * 100 )}</li>
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
}, () => ({}))(Dashboard)
