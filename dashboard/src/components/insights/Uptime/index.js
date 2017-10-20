import {h} from 'preact'
import {connect} from 'preact-redux'
import R from 'ramda'

import DataGroup from 'insights/DataGroup'
import {getUptime} from 'modules/insights'

const Uptime = ({data, prettyFormat}) => {

	const groups = Object.keys(data)

	if (groups.length === 0) return ""

	let faster, slower

	const body = groups.map(group => {

			//group content and do all the math before rendering views
			const groupList = data[group]

			const columnDate = prettyFormat(group)
			const columnUptime = getUptime(groupList) * 100
			const columnItems = groupList.length

			faster = faster !== undefined ? Math.max(faster, columnUptime) : columnUptime
			slower = slower !== undefined ? Math.min(slower, columnUptime) : columnUptime

			return {columnDate, columnUptime, columnItems}

		}).map(({columnDate, columnItems, columnUptime}, index) => {

			let statusClass = ''

			if (slower == faster) {
				statusClass = ''
			} else if (columnUptime == slower) {
				statusClass = 'higher'
			} else if (columnUptime == faster) {
				statusClass = 'lower'
			}

			return (<tr className={statusClass} key={'uptime-' + index}>
				<td>{columnDate}</td>
				<td>{columnItems}</td>
				<td>{columnUptime}%</td>
			</tr>)
		})

	return (<div className={'insight'}>
		<h2>Uptime:</h2>
		<table>
			<thead>
				<tr>
					<th><DataGroup /></th>
					<th>checks</th>
					<th>uptime</th>
				</tr>
			</thead>
			<tbody>{body}</tbody>
		</table>
	</div>)
}

const resolveFormat = R.curry((format, value) => format(value))

export default connect(({samples}) => {
	const data = samples.group.groupBy(samples.data)
	const prettyFormat = resolveFormat(samples.group.groupPretty)

	return {data, prettyFormat}

}, null)(Uptime)
