import {h} from 'preact'
import {connect} from 'preact-redux'
import dispatcher from './dispatcher'
import ns from 'stores/ns'

const DataGroup = ({groupBy}) => {
	return (<select onchange={groupBy}>
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

export default connect(ns, dispatcher)(DataGroup)
