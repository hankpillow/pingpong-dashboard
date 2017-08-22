import {h} from 'preact'
import {connect} from 'preact-redux'
import {actions} from './actions'

const GroupBy = ({groupBy}) => {
	return (<select onchange={groupBy}>
			<option value={'day'}>daily</option>
			<option value={'hour'}>hour</option>
			<option value={'week'}>weekly</option>
		</select>)
}
export default connect(state => ({}), actions)(GroupBy)
