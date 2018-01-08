import {h} from 'preact'
import {connect} from 'preact-redux'
import R from 'ramda'

import GenericInsight from 'components/GenericInsight'
import {defaultPayload as defaultGroup} from 'components/DataGroup/dispatcher'
import {getUptime} from 'modules/insights'

const resolveFormat = R.curry((format, value) => format(value))

const Uptime = ({rows}) => {
	const data = {
		header: ['%', 'checks'],
		rows
	}
	return <GenericInsight name="Uptime" data={data} />
}

export default connect(({samples, panes}) => {
	let faster, slower

	const groupper = panes['Uptime'] || defaultGroup
	const prettyFormat = resolveFormat(groupper.groupPretty)
	const data = groupper.groupBy(samples.data)
	const groups = Object.keys(data)

	const rows = groups.map(group => {

			const groupList = data[group]

			const columnDate = prettyFormat(group)
			const columnPercent = (getUptime(groupList) * 100).toPrecision(3)
			const columnChecks = groupList.length

			faster = faster !== undefined ? Math.max(faster, columnPercent) : columnPercent
			slower = slower !== undefined ? Math.min(slower, columnPercent) : columnPercent

			return [columnDate, columnPercent, columnChecks]

		}).map((columns) => {

			let style = ''

			if (slower === faster) {
				style = ''
			} else if (columns[1] === slower) {
				style = 'higher'
			} else if (columns[1] === faster) {
				style = 'lower'
			}

			return {style, data:columns}
			})

	return {rows}

}, null)(Uptime)

