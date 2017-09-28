const typeFecth = 'fetch data'
const typeLoaded = 'data loaded'
const typeError = 'error to load'

const dispatcher = (dispatch) => {
	return {
			load: (query) => {
				//TO-DO remove this hardcoded host
				query += '?url=http://www.honda.com.br/motos/'
				dispatch({query, type: typeFecth})

				fetch(query)
					.then(resp => resp.json())
					.then(payload => dispatch({payload, type: typeLoaded}))
					.catch(error => dispatch({errorMsg: error.message, type: typeError}))
		}
	}
}

export {typeFecth, typeLoaded, typeError}
export default dispatcher
