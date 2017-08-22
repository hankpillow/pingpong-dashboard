import actions from '../../actions'

const status = {
	LOADING: "loading",
	READY: "ready",
	ALERT: "alert"
}

const DEFAULT_STATE = {
	value: status.READY
}

const reducer = (state, action) => {

	switch(action.type) {

		case actions.DATA_FETCH:
			return {
				value: status.LOADING,
			}

		case actions.DATA_LOADED:
			return {
				value: status.READY,
			}

		case actions.SERVER_DOWN:
			return {
				value: status.ALERT,
				error: action.error
			}
	}
	return DEFAULT_STATE
}

export default reducer
