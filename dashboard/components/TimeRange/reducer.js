import actions from 'actions'
import {toDate} from 'modules/data'

const DEFAULT_STATE = {
	busy: false,
	response:null,
	data: []
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
				data: toDate(action.payload)
			}

		default:
			return {...DEFAULT_STATE, ...state}
	}
}
