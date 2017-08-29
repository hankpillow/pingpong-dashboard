//because connect (preact-redux) expect a state handler but not all connected apps 
//will consume states, this is just a way to provide a valid state manager that does nothing
export default () => ({})
