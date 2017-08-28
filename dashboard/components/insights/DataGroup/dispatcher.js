import {
	groupByDate,
	groupByMonth,
	groupByWeekNum,
	groupByWeekDay,
	groupByDay,
	groupByYear,
	groupByHour,
	groupByTimeFrame
} from 'modules/data'

import {prettyDate, prettyMonth, prettyWeekDay} from 'modules/timeformat'

const formatTimeframe = val => {
	switch(parseInt(val, 10)) {
		case 1: return 'madrugada'
		case 2: return 'manha'
		case 3: return 'tarde'
		default: return 'noite'
	}
}

const formatDay = val => {
	let end = val.toString()
	end = end.charAt(end.length-1)
	if (end == '1') return `${val}st`
	if (end == '2') return `${val}nd`
	if (end == '3') return `${val}rd`
	return `${val}th`
}

const formatHour = val => `${val}h`
const formatWeekNum = val => `${val}W`
const formatWeekDay = val => prettyWeekDay(val)
const formatMonth = val => prettyMonth(val)
const formatDate = val => prettyDate(new Date(val))

const type = 'groupBy'

const defaultPayload = {
	groupBy: groupByDate,
	groupName: 'date',
	groupPretty: formatDate
}

const dispatcher = (dispatch) => {

	return {

		groupBy: event => {

			const groupName = event.target.value
			let payload = {...defaultPayload, groupName}

			switch(event.target.value) {

				case 'timeframe':
					payload.groupBy = groupByTimeFrame
					payload.groupPretty = formatTimeframe
					break

				case 'hour':
					payload.groupBy = groupByHour
					payload.groupPretty = formatHour
					break

				case 'year':
					payload.groupBy = groupByYear
					payload.groupPretty = val => val
					break

				case 'day':
					payload.groupBy = groupByDay
					payload.groupPretty = formatDay
					break

				case 'week-day':
					payload.groupBy = groupByWeekDay
					payload.groupPretty = formatWeekDay
					break

				case 'week-num':
					payload.groupBy = groupByWeekNum
					payload.groupPretty = formatWeekNum
					break

				case 'month':
					payload.groupBy = groupByMonth
					payload.groupPretty = formatMonth
					break

				case 'date':
				default:
					payload.groupBy = defaultPayload
					payload.groupPretty = formatDate
			}
			return dispatch({type, payload})
		},
	}
}

export  {defaultPayload, type}
export default dispatcher
