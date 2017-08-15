import {h} from 'preact'
import {connect} from 'preact-redux'

import {reducer, actions} from './store'
import DataGrid from './DataGrid'
import GroupBy from './GroupBy'

const ErrorCard = (state, store, foo) => {

	/*eslint-disable*/
	debugger

	// if (!data || (data && data.length === 0)){
	// 	return (<div className={'error-wrapper'}>
	// 		<h3>Oki doki!</h3>
	// 		<span>Seems that your log has no error!</span>
	// 	</div>)
	// }

	// this is the card's store. no need to be
	// on the flow of parent's store
	// const store = createStore(reducer, {data})

	return (<div className={'error-wrapper'}>
				<h3>Error list ({data.length})</h3>
				// <GroupBy />
				// <DataGrid />
		</div>)
}

// export default ErrorCard
export default connect(state => (state), actions)(ErrorCard)
