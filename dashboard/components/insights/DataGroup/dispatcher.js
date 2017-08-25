import {groupByDate, groupByMonth, groupByWeekNum, groupByWeekDay, groupByDay, groupByYear, groupByHour, groupByTimeFrame} from 'modules/data'

const defaultPayload = groupByDate
const type = 'groupBy'

const dispatcher = (dispatch) => {
	return {
		groupBy: event => {
			const target = event.target.value
			switch(event.target.value) {
				case 'timeframe': return dispatch({type, target, payload: groupByTimeFrame})
				case 'hour': return dispatch({type, target, payload: groupByHour})
				case 'year': return dispatch({type, target, payload: groupByYear})
				case 'day': return dispatch({type, target, payload: groupByDay})
				case 'week-day': return dispatch({type, target, payload: groupByWeekDay})
				case 'week-num': return dispatch({type, target, payload: groupByWeekNum})
				case 'month': return dispatch({type, target, payload: groupByMonth})
				case 'date':
				default: return dispatch({ type, target, payload: defaultPayload})
			}
		},

	}
}

export  {defaultPayload, type}
export default dispatcher
