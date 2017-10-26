// libs
import {h, render} from 'preact'
import {Provider} from 'preact-redux'

// app
import store from 'stores'

// components
import Api from 'components/api'
import Uptime from 'insights/Uptime'
import Downtime from 'insights/Downtime'
import ErrorTable from 'insights/ErrorTable'
import FirstByte from 'insights/FirstByte'

render(
	<Provider store={store}>
		<div>
			<header>
				<Api />
			</header>
			<main>
				<Downtime />
				<FirstByte />
				<Uptime />
				<ErrorTable />
			</main>
		</div>
	</Provider>
, document.body)
