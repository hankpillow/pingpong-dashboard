import {h} from 'preact'
import {connect} from 'preact-redux'
import dispatcher from './dispatcher'

const SelectTime = ({busy, load}) => {

	let getSelected = evt => {
		const target = evt.target 
		const value = target.options[target.selectedIndex].value
		if (value.length) load(evt.target.form.action + value)
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
					<option value="">Select how far you data is...</option>
					<option value="30m">last 30min</option>
					<option value="24h">last 24h</option>
					<option value="7d">last week</option>
					<option value="31d">last month</option>
					<option value="90d">90 days</option>
				</select>
			</label>
		</form>
	)
}
export default connect(state => ({busy: state.busy}), dispatcher)(SelectTime)
