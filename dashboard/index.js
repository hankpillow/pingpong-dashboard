// libs
import {h, render} from 'preact'
import {Provider} from 'preact-redux'

// app
import store from 'stores/api'

// components
import Api from 'components/api'
import Panes from 'components/panes'

render(
	<Provider store={store}>
		<main>
			<Api />
			<Panes />
		</main>
	</Provider>
, document.body)
