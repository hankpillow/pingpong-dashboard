import {h} from 'preact'
import {connect} from 'preact-redux'
import R from 'ramda'

import ExitCodeList from './ExitCodeList'

const ErrorTable = ({data, prettyFormat, total}) => {
	const groups = Object.keys(data)

	if (groups.length === 0){
		return (<p>nothing to show</p>)
	}

	let faster, slower

	const body = groups.map(group => {

			//group content and do all the math before rendering views
			const groupList = data[group]

			const columnDate = prettyFormat(group)
			const columnChecks = groupList.length
			const columnPercent = (groupList.length / total * 100).toPrecision(3)
			const errList = R.pluck('exit_code', groupList)

			faster = faster !== undefined ? Math.min(faster, columnPercent) : columnPercent
			slower = slower !== undefined ? Math.max(slower, columnPercent) : columnPercent

			return {group, columnDate, groupList, columnChecks, columnPercent, errList}

		}).map(({group, columnDate, columnChecks, columnPercent, errList}) => {

			let statusClass = ''

			if (slower == faster) {
				statusClass = ''
			} if (columnPercent == slower) {
				statusClass = 'higher'
			} else if (columnPercent == faster) {
				statusClass = 'lower'
			}

			return (<tr className={statusClass} key={'error-' + group}>
				<td>{columnDate}</td>
				<td>{columnChecks}</td>
				<td>{columnPercent}%</td>
				<td><ExitCodeList data={errList} /></td>
			</tr>)
		})

		console.log(faster, slower)

	return (<div>
		<table>
			<thead>
				<tr>
					<th>group</th>
					<th>checks</th>
					<th>%</th>
					<th>curl error code</th>
				</tr>
			</thead>
			<tbody>{body}</tbody>
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
