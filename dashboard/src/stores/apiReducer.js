import {typeError, typeLoaded, typeFecth} from 'components/api/SelectTime/dispatcher'

const DEFAULT_STATE = {
	busy: false,
	errorMsg: '',
	query: ''
}

export default (state, action) => {
	
	if (!state)	return {
			...DEFAULT_STATE
		}
	
	switch(action.type) {

		case typeFecth: return {
				...state,
				busy: true,
				query: action.query
			}

		case typeLoaded: return {
				...state,
				busy: false,
			}
		
		case typeError: return {
			...DEFAULT_STATE,
			errorMsg: action.payload.error
		}
		
		default:
			return state
	}
}
