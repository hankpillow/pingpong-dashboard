import {defaultGroupName} from 'insights/DataGroup'
import {defaultPayload as defaultGroup, type as GroupAction} from 'insights/DataGroup/dispatcher'
import {defaultPayload as defaultFormat, type as DateAction} from 'insights/DateFormat/dispatcher'

const DEFAULT_STATE = {
	groupName: defaultGroupName,
	groupFn: defaultGroup,
	dateFormat: defaultFormat,
	data:[],
}

const reducer = (state, action) => {

	switch(action.type){

		case '@@INIT': return {
				...DEFAULT_STATE,
				data: state
			}

		case GroupAction: return {
				...state,
				groupName:action.target,
				groupFn:action.payload
			}

		case DateAction: return {
				...state,
				dateFormat:action.payload
			}

		default:
			return {...DEFAULT_STATE, ...state}
	}
}

export default reducer

