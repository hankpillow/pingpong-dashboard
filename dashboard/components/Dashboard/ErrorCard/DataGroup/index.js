import {h} from 'preact'
import {connect} from 'preact-redux'
import dispatcher from '../dispatcher'

const DataGroup = ({groupBy}) => {
	return (<select onchange={groupBy}>
			<option value={'day'}>daily</option>
			<option value={'hour'}>hour</option>
			<option value={'week'}>weekly</option>
		</select>)
}
export default connect(state => ({}), dispatcher)(DataGroup)
