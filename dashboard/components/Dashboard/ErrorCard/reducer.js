import {defaultGroupBy, type as GroupAction} from 'insights/DataGroup/dispatcher'
import {defaultFormatter, type as DateAction} from 'insights/DateFormatter/dispatcher'
import R from 'ramda'

const DEFAULT_STATE = {
	dataGroup: defaultGroupBy,
	dateFormatter: defaultFormatter,
	origin:[],
	data:[]
}

const formatTime = (data, transform) => {
	const transformItem = (item) => {
		return {
			...item,
			groupBy:transform(item.groupBy)
		}
	}
	return R.compose(
		R.map(R.map(item => transformItem(item))),
		R.map(R.filter(item => !!item.groupBy))
	)(data)
}

const refreshData = (data, group = DEFAULT_STATE.dataGroup, format = DEFAULT_STATE.dateFormatter) => {
	return formatTime(group(data), format)
}

const reducer = (state, action) => {

	switch(action.type){

		case '@@INIT':
			return {
				...DEFAULT_STATE,
				data: refreshData(state),
				origin: state
			}

		case GroupAction:
			return {
				...state,
				dataGroup:action.payload,
				data:refreshData(state.origin, action.payload, state.dateFormatter)
			}

		case DateAction:
			return {
				...state,
				dateFormatter:action.payload,
				data:refreshData(state.origin, state.dataGroup, action.payload)
			}

		default:
			return {...DEFAULT_STATE, ...state}
	}
}

export default reducer

