import {h} from 'preact'
import {connect} from 'preact-redux'
import dispatcher from './dispatcher'

const DateFormat = ({formatTime}) => {
	return (<select onchange={formatTime}>
		<option value={'date'}>date</option>
		<option value={'pretty'}>pretty</option>
</select>)
}

export default connect(() => ({}), dispatcher)(DateFormat)
