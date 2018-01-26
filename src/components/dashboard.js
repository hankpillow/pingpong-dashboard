import {h, render} from 'preact';
import {createStore} from 'redux'
import {Provider} from 'preact-redux'
import Reports from 'components/reports'
import CreateReport from 'components/create-report'

const dashReducer = (state = [], action = {type:null}) => {
  switch (action.type) {
    case 'add': return [...state, action.payload]
    default: return state
  }
}

const store = createStore(dashReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default () => (
  <Provider store={store}>
    <main>
      <CreateReport/>
      <Reports />
    </main>
  </Provider>
);
