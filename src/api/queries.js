const series = `
	query series($url: String, $metric: FloatProps, $limit: Int = 1000) {
		series (url: $url, prop: $metric, limit: $limit) {
			url
			prop
			dates
			series
		}
	}
`;

const pages = `query pages { pages }`;

const StringDataQueries = {
  pages
}

const FloatDataQuerues = {
  series
}

export {StringDataQueries, FloatDataQuerues}
export default pages
