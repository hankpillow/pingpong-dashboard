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
					<option value="tail/100">last 100 samples</option>
					<option value="tail/1000">last 1000 samples</option>
					<option value="v2/back/30m">back 30min</option>
					<option value="v2/back/24h">back 24h</option>
					<option value="v2/back/7d">back one week</option>
					<option value="v2/back/30d">back one month</option>
				</select>
			</label>
		</form>
	)
}
export default connect(state => ({busy: state.busy}), dispatcher)(SelectTime)
