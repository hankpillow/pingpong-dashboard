import {h} from 'preact'
import {connect} from 'preact-redux'
import nd from 'stores/nd'
import ns from 'stores/ns'

import ErrorCard from './ErrorCard'

const Panes = () => {
	return (<div className={'dashboard'}>
			<ErrorCard/>
		</div>)
}
export default connect(ns, nd)(Panes)
