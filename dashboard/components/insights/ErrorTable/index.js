import {h} from 'preact'
import {connect} from 'preact-redux'
import R from 'ramda'
import nd from 'stores/nd'

import ExitCodeList from './ExitCodeList'

const ErrorTable = ({data, prettyFormat}) => {
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
					const dateColumn = prettyFormat(group)
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

const resolveFormat = R.curry((format, value) => format(value))

export default connect(state => {
	return {
		data:state.error.group.groupBy(state.error.data),
		prettyFormat: resolveFormat(state.error.group.groupPretty)
	}
}, nd)(ErrorTable)
