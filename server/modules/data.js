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

const groupBy = (prop, fn) => data => R.compose(reduceByProp(prop, fn), onlyDate)(data)

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

const groupByDate = groupBy('date', BY_DATE)
const groupByHour = groupBy('date',BY_HOUR)
const groupByDay = groupBy('date',BY_DAY)
const groupByWeekNum = groupBy('date',BY_WEEK_NUM)
const groupByWeekDay = groupBy('date',BY_WEEK_DAY)
const groupByMonth = groupBy('date',BY_MONTH)
const groupByYear = groupBy('date',BY_YEAR)
const groupByTimeFrame = groupBy('date',BY_TIME_FRAME)

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

export {
	toDate, sortByProp,
	groupByDate, groupByMonth, groupByWeekNum, groupByWeekDay, groupByDay, groupByYear, groupByHour, groupByTimeFrame
}
