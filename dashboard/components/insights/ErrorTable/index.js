import {h} from 'preact'
import {connect} from 'preact-redux'
import R from 'ramda'
import {tinyDate, pretty} from 'modules/timeformat'

import ExitCodeList from './ExitCodeList'

const resolveFormat = R.curry((format, value) => format(value))

const ErrorTable = ({data, transformDate}) => {
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

export default connect(state => {
	return {
		data:state.group.groupBy(state.data),
		transformDate: resolveFormat(state.group.groupPretty)
	}
}, () => ({}))(ErrorTable)
