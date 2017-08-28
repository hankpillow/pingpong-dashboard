import {defaultPayload as groupPayload, type as GroupAction} from 'insights/DataGroup/dispatcher'

const DEFAULT_STATE = {
	group: groupPayload,
	data: [],
}

const reducer = (state, action) => {

	switch(action.type){

		case '@@INIT': return {
				...DEFAULT_STATE,
				data: state
			}

		case GroupAction: return {
				...state,
				group:action.payload
			}

		default: return {...state}
	}
}

export default reducer

