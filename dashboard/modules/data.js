import R from 'ramda'
import {getWeekNumber} from './timeformat'

const BY_TIME_FRAME = date => {
	const h = date.getHours()
	if (h < 6) return 1
	if (h < 12) return 2
	if (h < 18) return 3
	if (h < 24) return 4

}
const BY_DATE = date => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
const BY_HOUR = date => `${date.getHours()}`
const BY_DAY = date => `${date.getDate()}`
const BY_WEEK_DAY = date => `${date.getDay()}`
const BY_WEEK_NUM = date => `${getWeekNumber(date)}`
const BY_MONTH = date => `${date.getMonth()}`
const BY_YEAR = date => `${date.getFullYear()}`

const onlyDate = R.compose(R.filter(R.propIs(Date, 'date')), R.filter(R.is(Object)))

const reduceByProp = (prop, propReducer) => {
	return R.reduce((result, item) => {
		const groupName = propReducer(item[prop])
		if (!result[groupName]){
			result[groupName] = []
		}
		result[groupName].push(item)
		return result
	}, {})
}

const groupBy = fn => R.compose(reduceByProp('date', fn), onlyDate)

const groupByDate = groupBy(BY_DATE)
const groupByHour = groupBy(BY_HOUR)
const groupByDay = groupBy(BY_DAY)
const groupByWeekNum = groupBy(BY_WEEK_NUM)
const groupByWeekDay = groupBy(BY_WEEK_DAY)
const groupByMonth = groupBy(BY_MONTH)
const groupByYear = groupBy(BY_YEAR)
const groupByTimeFrame = groupBy(BY_TIME_FRAME)

const filterError = R.filter(R.propEq('type','error'))
const filterSample = R.filter(R.propEq('type','sample'))

const pluck = (prop, list) => R.pluck(prop)(list)

const toDate = R.compose(
	R.map(item => ({...item, date:new Date(item.date)})),
	R.filter(item => !isNaN(Date.parse(item.date))),
	R.filter(R.propIs(String, 'date')),
	R.filter(R.has('date')),
	R.filter(R.is(Object))
)

const sortByProp = (prop, fn = (a,b) => a > b) => {
	return R.compose(
		R.sort(fn),
		R.filter(R.has(prop)),
		R.filter(R.is(Object))
	)
}

/* all data action are made for lists.
 * for single units you can use the proxy*/
const single = R.curry((fn, data) => fn([data])[0])

export {
	toDate, single, pluck, sortByProp,
	filterError, filterSample,
	groupByDate, groupByMonth, groupByWeekNum, groupByWeekDay, groupByDay, groupByYear, groupByHour, groupByTimeFrame
}
