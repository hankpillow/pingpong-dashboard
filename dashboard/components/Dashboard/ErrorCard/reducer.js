import {defaultPayload as defaultGroup, type as GroupAction} from 'insights/DataGroup/dispatcher'
import {defaultPayload as defaultFormat, type as DateAction} from 'insights/DateFormatter/dispatcher'
import R from 'ramda'

const DEFAULT_STATE = {
	dataGroup: defaultGroup,
	dateFormat: defaultFormat,
	origin:[],
	data:[]
}

const formatTime = (data, transform) => {
	const transformItem = (item) => {
		return {
			...item,
			groupBy:transform(item.date)
		}
	}
	return R.compose(
		R.map(R.map(item => transformItem(item))),
		R.map(R.filter(item => !!item.groupBy))
	)(data)
}

const refreshData = (data, group = defaultGroup, format = defaultFormat) => {
	return group(data)
}

const reducer = (state, action) => {

	switch(action.type){

		case '@@INIT': return {
				...DEFAULT_STATE,
				data: refreshData(state),
				origin: state
			}

		case GroupAction: return {
				...state,
				targetGroup:action.target,
				dataGroup:action.payload,
				data:refreshData(state.origin, action.payload, state.dateFormatter)
			}

		case DateAction: return {
				...state,
				targetFormat:action.target,
				dateFormat:action.payload,
				data:refreshData(state.origin, state.dataGroup, action.payload)
			}

		default:
			return {...DEFAULT_STATE, ...state}
	}
}

export default reducer

