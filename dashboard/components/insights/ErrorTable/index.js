import {h} from 'preact'
import {connect} from 'preact-redux'
import R from 'ramda'
import {tinyDate, pretty} from 'modules/timeformat'

import ExitCodeList from './ExitCodeList'
// import DateFormat from 'insights/DateFormat'

/*eslint-disable*/
const resolveFormat = R.curry((groupName, dateFormat, value) => {
	return value
	// switch(groupName) {
	// 	case 'hour':
	// 			return dateFormat == 'pretty' ? (value+'h') : value

	// 	case 'day':
	// 	default:
	// 		return dateFormat === 'pretty' ? tinyDate(new Date(value)) : new Date(value).toDateString()
	// }
})

const ErrorTable = (state) => {
	const data = state.groupFn(state.data)
	const transformDate = resolveFormat(state.groupName, state.dateFormat)
	return (<div className={'data-group'}>
		<table>
			<thead>
				<tr>
					<th>group</th>
					<th>checks</th>
					<th>curl error code</th>
				</tr>
			</thead>
			<tbody>
				{Object.keys(data).map(group => {
					const dateColumn = transformDate(group)
					const groupList = data[group]
					const errList = groupList.map(item => item.exit_code)
					return (<tr>
							<td>{dateColumn}</td>
							<td>{groupList.length}</td>
							<td><ExitCodeList data={errList} /></td>
						</tr>)
				})}
			</tbody>
		</table>
	</div>)
}

export default connect(state => ({...state}), () => ({}))(ErrorTable)
