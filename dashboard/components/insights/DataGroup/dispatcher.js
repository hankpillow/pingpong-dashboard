import * as data from 'modules/data'
import * as time from 'modules/timeformat'

const resolvePayload = groupName => {
	let payload = ({groupName})

	switch(groupName) {
			case 'timeframe':
				payload.groupBy = data.groupByTimeFrame
				payload.groupPretty = time.prettyTimeframe
				break

			case 'hour':
				payload.groupBy = data.groupByHour
				payload.groupPretty = time.prettyHour
				break

			case 'year':
				payload.groupBy = data.groupByYear
				payload.groupPretty = val => val
				break

			case 'day':
				payload.groupBy = data.groupByDay
				payload.groupPretty = time.prettyDay
				break

			case 'week-day':
				payload.groupBy = data.groupByWeekDay
				payload.groupPretty = time.prettyWeekDay
				break

			case 'week-num':
				payload.groupBy = data.groupByWeekNum
				payload.groupPretty = time.prettyWeekNum
				break

			case 'month':
				payload.groupBy = data.groupByMonth
				payload.groupPretty = time.prettyMonth
				break

			case 'date':
			default:
				payload.groupName = 'date'
				payload.groupBy = data.groupByDate
				payload.groupPretty = time.prettyDate
		}
		return payload
}

const defaultPayload = resolvePayload()
const type = 'groupBy'

const dispatcher = (dispatch) => {
	return {
		groupBy: event => {
			const payload = resolvePayload(event.target.value)
			return dispatch({type, payload})
		},
	}
}


export {defaultPayload, type}
export default dispatcher
