import {defaultPayload, type as GroupAction} from 'insights/DataGroup/dispatcher'
import {DATA_LOADED} from 'components/api/SelectTime/dispatcher'
import {toDate, filterError} from 'modules/data'

const DEFAULT_STATE = {
	group: defaultPayload,
	data: [],
}

const reducer = (state, action) => {

	switch(action.type){

		case '@@INIT': return {
				...DEFAULT_STATE
			}

		case DATA_LOADED: return {
			...state,
			data: filterError(toDate(action.payload))
		}

		case GroupAction: return {
				...state,
				group:action.payload
			}
		}

		return {...state}
}

export default reducer
