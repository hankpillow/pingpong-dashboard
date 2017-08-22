import {tinyDate, pretty} from 'modules/timeformat'
const defaultFormatter = val => val.toString()
const type = 'formatDate'

const dispatcher = (dispatch) => {
	return {
		formatTime: event => {
			switch(event.target.value){
				case 'date':
					return dispatch({ type, payload: val => new Date(val).toDateString() });
				case 'pretty':
					return dispatch({ type, payload: val => pretty(val) });
				case 'tinyDate':
					return dispatch({ type, payload: val => tinyDate(new Date(val)) });
				default:
					return dispatch({ type, payload: defaultFormatter});
			}
		}
	}
}

export {defaultFormatter, type}
export default dispatcher
