import {defaultPayload, type as GroupAction} from 'insights/DataGroup/dispatcher'
import {typeLoaded as APILoaded} from 'components/api/SelectTime/dispatcher'
import {toDate, filterError} from 'modules/data'

const DEFAULT_STATE = {
	group: defaultPayload,
	data: [],
}

export default (state, action) => {

	if (!state)	return {
		...DEFAULT_STATE
	}

	switch(action.type){

		case APILoaded: return {
			...state,
			data: toDate(filterError(action.payload))
		}

		case GroupAction: return {
				...state,
				group:action.payload
			}

		default: 
			return state
		}
}
