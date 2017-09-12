import {h} from 'preact'
import {connect} from 'preact-redux'
import dispatcher from './dispatcher'

const DataGroup = ({groupBy}) => {
	return (<select onChange={groupBy}>
			<option value={'date'}>date</option>
			<option value={'month'}>month</option>
			<option value={'week-num'}>week number</option>
			<option value={'week-day'}>week day</option>
			<option value={'day'}>day</option>
			<option value={'year'}>year</option>
			<option value={'hour'}>hour</option>
			<option value={'timeframe'}>timeframe</option>
		</select>)
}

export default connect(null, dispatcher)(DataGroup)
