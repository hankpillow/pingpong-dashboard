// libs
import {h, render} from 'preact'
import {Provider} from 'preact-redux'

// app
import store from 'store'

// components
import AppStatus from './components/AppStatus'
import TimeRange from './components/TimeRange'
// import Dashboard from './components/Dashboard'

render(
	<Provider store={store}>
		<main>
			<AppStatus />
			<TimeRange />
		</main>
	</Provider>
, document.body)
