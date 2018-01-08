import {h} from 'preact'
import {connect} from 'preact-redux'
import R from 'ramda'

import GenericInsight from 'components/GenericInsight'
import {defaultPayload as defaultGroup} from 'components/DataGroup/dispatcher'
import {getMedian} from 'modules/insights'

const resolveFormat = R.curry((format, value) => format(value))
const median = getMedian('time_starttransfer')

export default connect(({samples, panes}, {name, title = ''}) => {
	let faster, slower

	const groupper = panes[name] || defaultGroup
	const prettyFormat = resolveFormat(groupper.groupPretty)
	const data = groupper.groupBy(samples.data)
	const groups = Object.keys(data)

	const body = groups.map(group => {

			const groupList = data[group]

			const columnDate = prettyFormat(group)
			const columnValue = median(groupList).toPrecision(2)
			const columnChecks = groupList.length

			faster = faster !== undefined ? Math.min(faster, columnValue) : columnValue
			slower = slower !== undefined ? Math.max(slower, columnValue) : columnValue

			return {columnDate, columnValue, columnChecks}

		}).map(({columnDate, columnChecks, columnValue}) => {

			let statusClass = ''

			if (slower == faster) {
				statusClass = ''
			} else if (columnValue == slower) {
				statusClass = 'higher'
			} else if (columnValue == faster) {
				statusClass = 'lower'
			}

			return {columnDate, columnValue, columnChecks, statusClass}
			})

	return {body, name, unit: 'sec'}

}, null)(GenericInsight)

