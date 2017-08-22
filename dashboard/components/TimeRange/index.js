import {h} from 'preact'
import {connect} from 'preact-redux'
import actions from '../../actions'

const TimeRange = ({busy, apiFetch}) => {

	let getSelected = evt => {
		const value = evt.target.options[evt.target.selectedIndex].value
		const tmp = '?host=http://www.honda.com.br/motos/'
		if (value.length) apiFetch(evt.target.form.action + value + tmp)
	}
	return (
		<form
			className={status}
			name={'data-picker'}
			disabled={busy ? 'disabled' : ''}
			action="/api/"
		>
			<label>
				<select onChange={getSelected}>
					<option value="">Select the range you want to inspect</option>
					<option value="30m">just now</option>
					<option value="24h">last 24h</option>
					<option value="7d">last week</option>
					<option value="31d">last month</option>
					<option value="90d">90 days</option>
				</select>
			</label>
		</form>
	)
}

const loader = (dispatch) => {
	return {
			apiFetch: (query) => {
				//notify app that a new request is about to happen
				dispatch({query, type: actions.DATA_FETCH})

				//fetch data and notify when its done
				fetch(query)
					.then(resp => resp.json())
					.then(payload => dispatch({payload, type:actions.DATA_LOADED}))
					.catch(error => dispatch({error, type: actions.SERVER_DOWN}))
		}
	}
}

export default connect(state => ({busy: state.api.busy}), loader)(TimeRange)
