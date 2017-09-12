import {h} from 'preact'
import {connect} from 'preact-redux'
import ErrorCard from './ErrorCard'

const Panes = () => {
	return (<div className={'dashboard'}>
			<ErrorCard/>
		</div>)
}
export default connect(null, null)(Panes)
