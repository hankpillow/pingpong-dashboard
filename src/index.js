import {h, render} from 'preact';

let root;
function init() {
	const Dashboard = require('components/dashboard').default;
	root = render(<Dashboard />, document.body, root);
}

// in development, set up HMR:
if (module.hot) {
  // const dt = require('preact').devtools;
	module.hot.accept('components/dashboard', () => requestAnimationFrame(init) );
}

init();
