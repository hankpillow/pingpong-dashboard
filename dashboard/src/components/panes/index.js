import {h} from 'preact'
import {connect} from 'preact-redux'
import ErrorCard from './ErrorCard'
import SamplesCard from './SamplesCard'

const Panes = () => {
	return (<main className={'dashboard'}>
			<SamplesCard/>
			<ErrorCard/>
		</main>)
}
export default connect(null, null)(Panes)
