// libs
import {h, render} from 'preact'
import {Provider} from 'preact-redux'

// app
import store from 'stores'

// components
import Api from 'components/api'
import GenericInsight from 'components/GenericInsight'
// import Downtime from 'insights/Downtime'
// import Uptime from 'insights/Uptime'
// import ErrorTable from 'insights/ErrorTable'
// import FirstByte from 'insights/FirstByte'

// <FirstByte name="ttfb" title="Time to first byte"/>
// <ErrorTable name="errors" title="Errors"/>
// <Downtime name="downtime" title="Downtime" />
//

const foo = {
	header: ['foo', 'bar'],
	rows: [
		{style:'foo', data:['a', 10,20]},
		{style:'bar', data:['b', 30,40]}
	]
}

render(
	<Provider store={store}>
		<div>
			<header>
				<Api />
			</header>
			<main>
					<GenericInsight name="downtime" data={foo} />
			</main>
		</div>
	</Provider>
, document.body)
