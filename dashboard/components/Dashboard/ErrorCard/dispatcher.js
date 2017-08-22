import {tinyDate, pretty} from 'modules/timeformat'
import {groupByDay, groupByWeek, groupByHour} from 'modules/data'

const repeat = val => val.toString()

const actions = (dispatch) => {
	return {
		groupBy: event => {
			switch(event.target.value) {
				case 'week': dispatch({ type:'groupBy', payload: groupByWeek }); break
				case 'hour': dispatch({ type:'groupBy', payload: groupByHour }); break
				default: dispatch({ type:'groupBy', payload: groupByDay })
			}
		},
		formatTime: value => {
			switch(value){
				case 'date': dispatch({ type:'timeFormat', loader: val => new Date(val).toDateString() }); break
				case 'pretty': dispatch({ type:'timeFormat', loader: val => pretty(val) }); break
				case 'tinyDate': dispatch({ type:'timeFormat', loader: val => tinyDate(new Date(val)) }); break
				default: dispatch({ type:'timeFormat', loader: repeat });
			}
		}
	}
}

export default actions
