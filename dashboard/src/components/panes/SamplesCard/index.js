import {h} from 'preact'
import {connect} from 'preact-redux'
import SamplesTable from 'insights/SamplesTable'

const SamplesCard = ({data}) => {

	if (data.length == 0) return ""

	const msg = data.length ? data.length : ''

	return (<section className={'samples-wrapper'}>
			<h3>Sample list {msg}</h3>
			<SamplesTable />
		</section>)
}

export default connect(({samples}) => {
	return {data: samples.data}
}, null)(SamplesCard)
