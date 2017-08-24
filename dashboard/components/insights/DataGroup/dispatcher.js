import {groupByDay, groupByWeek, groupByHour} from 'modules/data'

const defaultPayload = groupByDay
const type = 'groupBy'

const dispatcher = (dispatch) => {
	return {
		groupBy: event => {
			const target = event.target.value
			switch(event.target.value) {
				case 'week': return dispatch({type, target, payload: groupByWeek})
				case 'hour': return dispatch({type, target, payload: groupByHour})
				default: return dispatch({ type, target, payload: defaultPayload})
			}
		},

	}
}

export  {defaultPayload, type}
export default dispatcher
