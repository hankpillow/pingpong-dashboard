const series = `
	query series($id: ID, $metric: FloatProps, $limit: Int = 1000) {
		series (id: $id, prop: $metric, limit: $limit) {
			prop
			dates
			series
		}
	}
`;

const pages = `query pages {
  pages
}`;

const StringDataQueries = {
  pages
}

const FloatDataQuerues = {
  series
}

export {StringDataQueries, FloatDataQuerues}
export default pages
