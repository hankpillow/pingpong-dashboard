import {h} from 'preact'
import {connect} from 'preact-redux'
import R from 'ramda'

import ExitCodeList from './ExitCodeList'

const ErrorTable = ({data, prettyFormat, total}) => {
	const groups = Object.keys(data)
	
	if (groups.length === 0){
		return (<p>nothing to show</p>)
	}

	return (<div className={'data-group'}>
		<table>
			<thead>
				<tr>
					<th>group</th>
					<th>checks</th>
					<th>%</th>
					<th>curl error code</th>
				</tr>
			</thead>
			<tbody>
				{groups.map(group => {
					const dateColumn = prettyFormat(group)
					const groupList = data[group]
					const errList = R.pluck('exit_code', groupList)
					return (<tr>
							<td>{dateColumn}</td>
							<td>{groupList.length}</td>
							<td>{(groupList.length/total*100).toPrecision(3)}%</td>
							<td><ExitCodeList data={errList} /></td>
						</tr>)
				})}
			</tbody>
		</table>
	</div>)
}

const resolveFormat = R.curry((format, value) => format(value))

export default connect(state => {
	const total = state.error.data.length
	const data = state.error.group.groupBy(state.error.data)
	const prettyFormat = resolveFormat(state.error.group.groupPretty)
	return {data, prettyFormat, total}
}, null)(ErrorTable)
