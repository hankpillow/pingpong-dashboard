import {h} from 'preact'
import {connect} from 'preact-redux'
import dispatcher from './dispatcher'

const DateFormatter = ({formatTime}) => {
	return (<select onchange={formatTime}>
		<option value={'date'}>date</option>
		<option value={'pretty'}>pretty</option>
		<option value={'tinyDate'}>tiny date</option>
</select>)
}

export default connect(() => ({}), dispatcher)(DateFormatter)
