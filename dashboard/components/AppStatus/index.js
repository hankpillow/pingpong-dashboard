import {h} from 'preact'
import {connect} from 'preact-redux'

const AppStatus = ({status}) => {
	return (
		<div className={'status'}>
			<span>{status.value}</span>
			<code>{status.error}</code>
		</div>
	)
}

export default connect(state => ({status:state.appStatus}), () => ({}))(AppStatus)
