import {DATA_FETCH, DATA_LOADED, FAIL} from './dispatcher'

const DEFAULT_STATE = {
	busy: false,
	errorMsg: '',
	query: ''
}

export default (state, action) => {

	switch(action.type){

		case DATA_FETCH: return {
				...state,
				busy: true,
				query: action.query
			}

		case DATA_LOADED: return {
				...state,
				busy: false,
			}
		
		case FAIL: return {
			...DEFAULT_STATE,
			errorMsg: action.payload.error
		}

		default: return {
				...DEFAULT_STATE,
				...state
			}
	}
}
