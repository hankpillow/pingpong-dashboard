const DEFAULT_STATE = {
	groupBy:null,
	timeFormat:null,
	group:null,
	data:[]
}

const reducer = (state, action) => {

	switch(action.type){

		case '@@INIT':
			return {...DEFAULT_STATE, data:state}

		case 'groupBy':
			return {...state, group:action.payload(state.data)}

		default:
			return {...DEFAULT_STATE, ...state}
	}
}

export default reducer

