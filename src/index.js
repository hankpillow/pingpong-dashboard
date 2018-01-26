import {h, render} from 'preact';

let root;
function init() {
	const Dashboard = require('components/dashboard').default;
	root = render(<Dashboard />, document.body, root);
}

// in development, set up HMR:
if (module.hot) {
	//require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('components/dashboard', () => requestAnimationFrame(init) );
}

init();
