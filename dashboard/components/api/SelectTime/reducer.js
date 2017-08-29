import {DATA_FETCH, DATA_LOADED, FAIL} from './dispatcher'
import {toDate, filterSample, filterError} from 'modules/data'

const DEFAULT_STATE = {
	busy: false,
	samples: [],
	errors: []
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
				samples: toDate(filterSample(action.payload)),
				errors: toDate(filterError(action.payload))
			}
		
		case FAIL: return {
			...DEFAULT_STATE,
			error: action.payload.error
		}

		default: return {
				...DEFAULT_STATE,
				...state
			}
	}
}
