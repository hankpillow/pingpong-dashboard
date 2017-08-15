import actions from 'actions'
import {toDate} from 'modules/data'

const DEFAULT_STATE = {
	disabled: false
}

export default (state, action) => {

	switch(action.type){

		case actions.DATA_FETCH:
			return {
				disabled: true,
				query: action.query
			}

		case actions.DATA_LOADED:
			return {
				...state,
				disabled: false,
				reponse: action.payload,
				data: toDate(action.payload)
			}

		default:
			return {...DEFAULT_STATE, ...state}
	}
}
