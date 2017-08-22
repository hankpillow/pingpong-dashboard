import actions from 'actions'
import {toDate, filterSample, filterError} from 'modules/data'

const DEFAULT_STATE = {
	busy: false,
	samples: [],
	errors: []
}

export default (state, action) => {

	switch(action.type){

		case actions.DATA_FETCH:
			return {
				...state,
				busy: true,
				query: action.query
			}

		case actions.DATA_LOADED:
			return {
				...state,
				busy: false,
				samples: toDate(filterSample(action.payload)),
				errors: toDate(filterError(action.payload))
			}

		default:
			return {...DEFAULT_STATE, ...state}
	}
}
