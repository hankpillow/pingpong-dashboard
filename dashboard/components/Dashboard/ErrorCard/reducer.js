import {defaultGroupBy} from './dispatcher'
const DEFAULT_STATE = {
	origin:[],
	data:[]
}

const reducer = (state, action) => {

	switch(action.type){

		case '@@INIT':
			return {...DEFAULT_STATE, data:defaultGroupBy(state), origin:state}

		case 'groupBy':
			return {...state, data:action.payload(state.origin)}

		default:
			return {...DEFAULT_STATE, ...state}
	}
}

export default reducer

