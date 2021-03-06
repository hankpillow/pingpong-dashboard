import {h} from 'preact'
import {connect} from 'preact-redux'
import R from 'ramda'

import DataGroup from 'insights/DataGroup'
import ExitCodeList from './ExitCodeList'

const ErrorTable = ({data, prettyFormat, total}) => {
	const groups = Object.keys(data)

	if (groups.length === 0) return ""

	let faster, slower

	const body = groups.map(group => {

			//group content and do all the math before rendering views
			const groupList = data[group]

			const columnDate = prettyFormat(group)
			const columnChecks = groupList.length
			const columnPercent = (groupList.length / total * 100).toPrecision(2)
			const errList = R.pluck('exit_code', groupList)

			faster = faster !== undefined ? Math.min(faster, columnPercent) : columnPercent
			slower = slower !== undefined ? Math.max(slower, columnPercent) : columnPercent

			return {columnDate, groupList, columnChecks, columnPercent, errList}

		}).map(({columnDate, columnChecks, columnPercent, errList}, index) => {

			let statusClass = ''

			if (slower == faster || groups.length <= 1) {
				statusClass = ''
			} else if (columnPercent == slower) {
				statusClass = 'higher'
			} else if (columnPercent == faster) {
				statusClass = 'lower'
			}

			return (<tr className={statusClass} key={'error-' + index}>
				<td>{columnDate}</td>
				<td>{columnChecks}</td>
				<td>{columnPercent}</td>
				<td><ExitCodeList data={errList} /></td>
			</tr>)
		})

	return (<div className={'insight'}>
		<h2>Error list:</h2>
		<table>
			<thead>
				<tr>
					<th><DataGroup /></th>
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

export default connect(({samples, errors}) => {
	const total = samples.data.length + errors.data.length
	const data = errors.group.groupBy(errors.data)
	const prettyFormat = resolveFormat(errors.group.groupPretty)

	return {data, prettyFormat, total}

}, null)(ErrorTable)
