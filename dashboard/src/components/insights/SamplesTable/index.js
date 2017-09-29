import {h} from 'preact'
import {connect} from 'preact-redux'
import R from 'ramda'

import DataGroup from 'insights/DataGroup'

const SamplesTable = ({data, prettyFormat, total}) => {
	const groups = Object.keys(data)

	if (groups.length === 0) return ""

	let faster, slower

	const body = groups.map(group => {

			//group content and do all the math before rendering views
			const groupList = data[group]

			const columnDate = prettyFormat(group)
			const columnChecks = groupList.length
			const columnPercent = (groupList.length / total * 100).toPrecision(3)

			faster = faster !== undefined ? Math.min(faster, columnPercent) : columnPercent
			slower = slower !== undefined ? Math.max(slower, columnPercent) : columnPercent

			return {group, columnDate, groupList, columnChecks, columnPercent}

		}).map(({group, columnDate, columnChecks, columnPercent}) => {

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
			</tr>)
		})

	return (<div>
		<table>
			<thead>
				<tr>
					<th><DataGroup /></th>
					<th>checks</th>
					<th>%</th>
				</tr>
			</thead>
			<tbody>{body}</tbody>
		</table>
	</div>)
}

const resolveFormat = R.curry((format, value) => format(value))

export default connect(({samples}) => {
	const total = samples.data.length
	const data = samples.group.groupBy(samples.data)
	const prettyFormat = resolveFormat(samples.group.groupPretty)

	return {data, prettyFormat, total}

}, null)(SamplesTable)
