import {typeLoaded as APILoaded} from 'components/api/SelectTime/dispatcher'
import {toDate} from 'modules/data'

const DEFAULT_STATE = {
	data: [],
}

export default (filter) => (state, action) => {

	if (!state)	return {
		...DEFAULT_STATE
	}

	switch(action.type){

		case APILoaded: return {
			...state,
			data: toDate(filter(action.payload))
		}

		default:
			return state
		}
}
