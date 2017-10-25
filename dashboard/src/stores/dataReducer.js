import {defaultPayload, type as GroupAction} from 'components/DataGroup/dispatcher'
import {typeLoaded as APILoaded} from 'components/api/SelectTime/dispatcher'
import {toDate} from 'modules/data'

const DEFAULT_STATE = {
	group: defaultPayload,
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

		case GroupAction: return {
				...state,
				group:action.payload
			}

		default:
			return state
		}
}
