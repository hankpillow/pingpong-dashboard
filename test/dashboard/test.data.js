import test from 'ava'
import * as d from '../../dashboard/modules/data'

test('data.filterSample', t => {
	const data = [
		{type:'sample',a:2},
		{type:'sample',a:1},
		{type:'error'}
	]
	t.deepEqual(d.filterSample(data)[0], data[0], 'should handle sample')
})
test('data.filterError', t => {
	const data = [
		{type:'sample',a:2},
		{type:'sample',a:1},
		{type:'error'}
	]

	t.is(d.filterError(data).length, 1, 'should filter error')
	t.deepEqual(d.filterError(data)[0], data[2], 'should filter  error')
})


test('data.groupByHour', t => {
	const data = [
		null,'',false,true,{},{data:'2016-1-19 13:30:01'},
		{date: new Date('2016-1-19 13:30:01')},
		{date: new Date('2016-1-19 13:10:31')},
		{date: new Date('2017-7-19 14:30:01')},
		{date: new Date('2014-1-19 13:59:31')},
	]
	const result = d.groupByHour(data)
	t.deepEqual(Object.keys(result), ['13', '14'], 'group items by hour')
	t.deepEqual(result['13'].length, 3, 'group items by hour')
	t.deepEqual(result['14'].length, 1, 'group items by hour')
})

test('data.groupByDay', t => {
	const data = [
		null,'',false,true,{},{data:'2016-1-19 13:30:01'},
		{date: new Date('2016-4-19 13:30:01')},
		{date: new Date('2016-1-18 23:10:31')},
		{date: new Date('2017-7-19 13:30:01')},
		{date: new Date('2014-3-19 23:10:31')},
	]
	const result = d.groupByDay(data)
	t.deepEqual(Object.keys(result), ['18', '19'], 'group items by day')
	t.deepEqual(result['18'].length, 1, 'group items by day')
	t.deepEqual(result['19'].length, 3, 'group items by day')
})

test('data.groupByWeekDay', t => {
	const data = [
		null,'',false,true,{},{data:'2016-1-19 13:30:01'},
		{date: new Date('2017-8-2')},
		{date: new Date('2017-8-9')},
		{date: new Date('2017-8-10')},
		{date: new Date('2017-8-30')},
	]
	const result = d.groupByWeekDay(data)
	t.deepEqual(Object.keys(result), ['3','4'], 'group items by week day')
	t.deepEqual(result['3'].length, 3, 'group items by week day')
	t.deepEqual(result['4'].length, 1, 'group items by week day')
})

test('data.groupByWeekNum', t => {
	const data = [
		null,'',false,true,{},{data:'2016-1-19 13:30:01'},
		{date: new Date('2017-1-2')},
		{date: new Date('2017-8-21')},
		{date: new Date('2017-12-31')},
	]
	const result = d.groupByWeekNum(data)
	t.deepEqual(Object.keys(result), ['1','34', '52'], 'group items by week num')
})

test('data.groupByMonth', t => {
	const data = [
		null,'',false,true,{},{data:'2016-1-19 13:30:01'},
		{date: new Date('2017-7-05 13:30:01')},
		{date: new Date('2017-7-19 13:31:01')},
		{date: new Date('2017-8-01 13:33:01')},
		{date: new Date('2017-7-14 13:31:01')}
	]
	const result = d.groupByMonth(data)
	t.deepEqual(Object.keys(result), ['6','7'], 'group items by month')
	t.deepEqual(result['6'].length, 3, 'group items by month')
	t.deepEqual(result['7'].length, 1, 'group items by month')
})

test('data.groupByYear', t => {
	const data = [
		null,'',false,true,{},{data:'2016-1-19 13:30:01'},
		{date: new Date('2017-7-05 13:30:01')},
		{date: new Date('2017-7-19 13:31:01')},
		{date: new Date('2018-8-01 13:33:01')},
		{date: new Date('2017-7-19 13:31:01')}
	]
	const result = d.groupByYear(data)
	t.deepEqual(Object.keys(result), ['2017','2018'], 'group items by year')
	t.deepEqual(result['2017'].length, 3, 'group items by year')
	t.deepEqual(result['2018'].length, 1, 'group items by year')
})

test('data.groupByDate', t => {
	const data = [
		null,'',false,true,{},{data:'2016-1-19 13:30:01'},
		{date: new Date('2017-7-19 23:59:59')},
		{date: new Date('2017-7-19 00:00:01')},
		{date: new Date('2018-8-01 13:33:01')},
		{date: new Date('2017-7-19 13:31:01')}
	]
	const result = d.groupByDate(data)
	t.deepEqual(Object.keys(result), ['2017-6-19','2018-7-1'], 'group items by date')
	t.deepEqual(result['2017-6-19'].length, 3, 'group items by date')
	t.deepEqual(result['2018-7-1'].length, 1, 'group items by date')
})

test('data.groupByTimeFrame', t => {
	const data = [
		null,'',false,true,{},{data:'2016-1-19 13:30:01'},
		{date: new Date('2017-7-19 00:00:01')},
		{date: new Date('2018-7-19 5:59:59')},
		{date: new Date('2018-7-19 6:00:00')},
		{date: new Date('2018-7-19 11:59:59')},
		{date: new Date('2017-7-19 12:00:00')},
		{date: new Date('2017-7-19 17:59:59')},
		{date: new Date('2017-7-19 18:00:00')},
		{date: new Date('2017-7-19 23:59:59')}
	]
	const result = d.groupByTimeFrame(data)
	t.deepEqual(Object.keys(result), ['1','2','3','4'], 'group items by timeframe')
	t.deepEqual(result['1'].length, 2, 'group items by timeframe')
	t.deepEqual(result['2'].length, 2, 'group items by timeframe')
	t.deepEqual(result['3'].length, 2, 'group items by timeframe')
	t.deepEqual(result['4'].length, 2, 'group items by timeframe')
})

