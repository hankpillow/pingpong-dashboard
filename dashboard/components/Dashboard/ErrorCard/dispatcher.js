import {tinyDate, pretty} from 'modules/timeformat'
import {groupByDay, groupByWeek, groupByHour} from 'modules/data'

const repeat = val => val.toString()

const defaultGroupBy =  groupByDay
const defaultFormatTime = repeat

const dispatcher = (dispatch) => {
	return {

		groupBy: event => {
			switch(event.target.value) {
				case 'week': return dispatch({ type:'groupBy', payload: groupByWeek })
				case 'hour': return dispatch({ type:'groupBy', payload: groupByHour })
				default: return dispatch({ type:'groupBy', payload: defaultGroupBy })
			}
		},

		formatTime: value => {
			switch(value){
				case 'date': dispatch({ type:'timeFormat', payload: val => new Date(val).toDateString() }); break
				case 'pretty': dispatch({ type:'timeFormat', payload: val => pretty(val) }); break
				case 'tinyDate': dispatch({ type:'timeFormat', payload: val => tinyDate(new Date(val)) }); break
				default: dispatch({ type:'timeFormat', payload: defaultFormatTime });
			}
		}
	}
}

export  { defaultGroupBy, defaultFormatTime }
export default dispatcher
