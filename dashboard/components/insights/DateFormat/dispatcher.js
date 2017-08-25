const type = 'formatDate'
const defaultPayload = 'date'

const dispatcher = (dispatch) => {
	return {
		formatTime: event => {
				dispatch({type, payload: event.target.value});
		}
	}
}

export {defaultPayload, type}
export default dispatcher
