const DEFAULT_STATE = {}

export default (state, action) => {

	if (!state)	return {
		...DEFAULT_STATE
	}

	if (action.type.match(/^datagroup-/)) {
		return {
			...state,
			[action.type.replace(/^datagroup-/, '')]: action.payload
		}
	}

	return state
}
