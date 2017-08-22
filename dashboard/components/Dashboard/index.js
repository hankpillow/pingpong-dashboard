//libs
import {h} from 'preact'
import {connect} from 'preact-redux'

//modules
import {filterSample, filterError} from 'modules/data'
import {getUptime} from 'modules/insights'

//comps
import ErrorCard from './ErrorCard'

const Dashboard = ({data}) => {

	if (data && data.length === 0) return 'nothing to show'

	const errors = filterError(data)
	const samples = filterSample(data)
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

export default connect(state => ({data:state.api.data}), () => ({}))(Dashboard)
