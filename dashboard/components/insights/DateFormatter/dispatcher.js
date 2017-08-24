import {tinyDate, pretty} from 'modules/timeformat'
const defaultPayload = val => val.toString()
const type = 'formatDate'

const dispatcher = (dispatch) => {
	return {
		formatTime: event => {
			const target = event.target.value
			switch(target) {
				case 'date': return dispatch({type, target, payload: val => new Date(val).toDateString()});
				case 'pretty': return dispatch({type, target, payload: val => pretty(val)});
				case 'tinyDate': return dispatch({type, target, payload: val => tinyDate(new Date(val))});
				default: return dispatch({type, target, payload: defaultPayload});
			}
		}
	}
}

export {defaultPayload, type}
export default dispatcher
