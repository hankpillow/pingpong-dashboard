import {groupByDay, groupByWeek, groupByHour} from 'modules/data'

const defaultGroupBy = groupByDay
const type = 'groupBy'

const dispatcher = (dispatch) => {
	return {

		groupBy: event => {
			switch(event.target.value) {
				case 'week': return dispatch({ type, payload: groupByWeek })
				case 'hour': return dispatch({ type, payload: groupByHour })
				default: return dispatch({ type, payload: defaultGroupBy })
			}
		},

	}
}

export  {defaultGroupBy, type}
export default dispatcher
