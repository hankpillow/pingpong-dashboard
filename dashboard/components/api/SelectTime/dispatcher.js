const	DATA_FETCH = 'fetch data'
const DATA_LOADED = 'data loaded'
const FAIL = 'fail to load'

const dispatcher = (dispatch) => {
	return {
			load: (query) => {
				//TO-DO remove this hardcoded host
				query += '?host=http://www.honda.com.br/motos/'
				dispatch({query, type: DATA_FETCH})

				fetch(query)
					.then(resp => resp.json())
					.then(payload => dispatch({payload, type: DATA_LOADED}))
					.catch(error => dispatch({errorMsg: error.message, type: FAIL}))
		}
	}
}

export {DATA_FETCH, DATA_LOADED, FAIL}
export default dispatcher
