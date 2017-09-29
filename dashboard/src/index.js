// libs
import {h, render} from 'preact'
import {Provider} from 'preact-redux'

// app
import store from 'stores'

// components
import Api from 'components/api'
import Uptime from 'insights/Uptime'
import ErrorTable from 'insights/ErrorTable'

render(
	<Provider store={store}>
		<div>
			<header>
				<Api />
			</header>
			<main>
				<Uptime />
				<ErrorTable />
			</main>
		</div>
	</Provider>
, document.body)
