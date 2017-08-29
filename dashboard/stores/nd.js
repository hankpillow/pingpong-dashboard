//because connect (preact-redux) expect a dispatcher (2nd param) and not every
//module attached to the store will do, this is a tiny snippet to these cases
export default () => ({})
