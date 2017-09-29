import {h} from 'preact'
import {connect} from 'preact-redux'

import ErrorTable from 'insights/ErrorTable'

const ErrorCard = ({data}) => {

	if (data.length == 0) return ""

	const msg = data.length ? data.length : ''

	return (<section className={'error-wrapper'}>
			<h3>Error list {msg}</h3>
			<ErrorTable />
		</section>)
}

export default connect(({errors}) => {
	return {data: errors.data}
}, null)(ErrorCard)
