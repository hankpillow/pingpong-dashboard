//libs
import {h} from 'preact'
import {connect} from 'preact-redux'

//modules
import * as D from 'modules/data'
// import {actions} from 'modules/store'
import {getUptime} from 'modules/insights'

//comps
import ErrorCard from './insights/ErrorCard'

const Dashboard = ({data}) => {
	data = data || []

	const samples = D.filterSample(data)
	const errors = D.filterError(data)
	const uptime = getUptime(samples)

	if (data.length === 0) return (<span>¯\_(ツ)_/¯</span>)

	return (<div className={'dashboard'}>
				<ul>
					<li>uptime: {parseInt(uptime * 100)}%</li>
				</ul>
				<div className={'uptime-chcks'}>
					<span>uptime checks:</span>
					<span>{samples[0].date}</span>
				</div>
				<ErrorCard data={errors} />
			</div>
	)
}

export default connect(state => ({data:state.data}), actions)(Dashboard)
