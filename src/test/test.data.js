import test from 'ava'
import * as d from '../modules/data'

test('data.filterSample', t => {
	const data = [
		null,'',false,true,{},
		{type:'sample',a:2},
		{type:'sample',a:1},
		{type:'error'}
	]
	const size = data.length
	t.deepEqual(d.filterSample(data)[0], data[5], 'should filter sample')
	t.is(d.filterSample(data).length, 2, 'should filter sample')
	t.deepEqual(data.length, size, 'should not change origin')
})

test('data.filterError', t => {
	const data = [
		null,'',false,true,{},
		{type:'sample',a:2},
		{type:'sample',a:1},
		{type:'error'}
	]
	const size = data.length
	t.deepEqual(d.filterError(data)[0], data[data.length-1], 'should filter error')
	t.is(d.filterError(data).length, 1, 'should filter error')
	t.is(data.length, size, 'should not change origin')
})


test('data.groupByHour', t => {
	const data = [
		null,'',false,true,{}, new Date(), {date:'2016-1-19 13:30:01'},
		{date: new Date('2016-1-1 13:30:01')},
		{date: new Date('2016-1-14 14:10:31')},
		{date: new Date('2017-7-19 14:30:01')},
		{date: new Date('2014-1-9 13:59:31')},
	]
	const size = data.length
	t.deepEqual(Object.keys(d.groupByHour(data)), ['13', '14'], 'group items by hour')
	t.is(d.groupByHour(data)['13'].length, 2, 'group items by hour')
	t.is(d.groupByHour(data)['14'].length, 2, 'group items by hour')
	t.is(data.length, size, 'should not change origin')
})

test('data.groupByDay', t => {
	const data = [
		null,'',false,true,{},new Date(),{date:'2016-1-19 13:30:01'},
		{date: new Date('2016-4-19 13:30:01')},
		{date: new Date('2016-1-18 23:10:31')},
		{date: new Date('2017-7-19 13:30:01')},
		{date: new Date('2014-3-19 23:10:31')},
	]
	const size = data.length
	t.deepEqual(Object.keys(d.groupByDay(data)), ['18', '19'], 'group items by day')
	t.is(d.groupByDay(data)['18'].length, 1, 'group items by day')
	t.is(d.groupByDay(data)['19'].length, 3, 'group items by day')
	t.is(data.length, size, 'should not change origin')
})

test('data.groupByWeekDay', t => {
	const data = [
		null,'',false,true,{},new Date(),{date:'2016-1-19 13:30:01'},
		{date: new Date('2017-8-2')},
		{date: new Date('2017-8-9')},
		{date: new Date('2017-8-10')},
		{date: new Date('2017-8-30')},
	]
	const size = data.length
	t.deepEqual(Object.keys(d.groupByWeekDay(data)), ['3','4'], 'group items by week day')
	t.is(d.groupByWeekDay(data)['3'].length, 3, 'group items by week day')
	t.is(d.groupByWeekDay(data)['4'].length, 1, 'group items by week day')
	t.is(data.length, size, 'should not change origin')
})

test('data.groupByWeekNum', t => {
	const data = [
		null,'',false,true,{},new Date(),{date:'2016-1-19 13:30:01'},
		{date: new Date('2017-1-2')},
		{date: new Date('2017-8-21')},
		{date: new Date('2017-12-31')},
	]
	const size = data.length
	t.deepEqual(Object.keys(d.groupByWeekNum(data))[0], '1', 'group items by week num')
	t.is(Object.keys(d.groupByWeekNum(data))[1], '34', 'group items by week num')
	t.is(Object.keys(d.groupByWeekNum(data))[2], '52', 'group items by week num')
	t.is(data.length, size, 'should not change origin')
})

test('data.groupByMonth', t => {
	const data = [
		null,'',false,true,{},new Date(), {date:'2016-1-19 13:30:01'},
		{date: new Date('2017-7-05 13:30:01')},
		{date: new Date('2017-7-19 13:31:01')},
		{date: new Date('2017-8-01 13:33:01')},
		{date: new Date('2017-7-14 13:31:01')}
	]
	const size = data.length
	t.deepEqual(Object.keys(d.groupByMonth(data)), ['6','7'], 'group items by month')
	t.is(d.groupByMonth(data)['6'].length, 3, 'group items by month')
	t.is(d.groupByMonth(data)['7'].length, 1, 'group items by month')
	t.is(data.length, size, 'should not change origin')
})

test('data.groupByYear', t => {
	const data = [
		null,'',false,true,{},new Date(),{date:'2016-1-19 13:30:01'},
		{date: new Date('2017-7-05 13:30:01')},
		{date: new Date('2017-7-19 13:31:01')},
		{date: new Date('2018-8-01 13:33:01')},
		{date: new Date('2017-7-19 13:31:01')}
	]
	const size = data.length
	t.deepEqual(Object.keys(d.groupByYear(data)), ['2017','2018'], 'group items by year')
	t.is(d.groupByYear(data)['2017'].length, 3, 'group items by year')
	t.is(d.groupByYear(data)['2018'].length, 1, 'group items by year')
	t.is(data.length, size, 'should not change origin')
})

test('data.groupByDate', t => {
	const data = [
		null,'',false,true,{},new Date(), {date:'2016-1-19 13:30:01'},
		{date: new Date('2017-7-19 23:59:59')},
		{date: new Date('2017-7-19 00:00:01')},
		{date: new Date('2018-8-01 13:33:01')},
		{date: new Date('2017-7-19 13:31:01')}
	]
	const size = data.length
	t.deepEqual(Object.keys(d.groupByDate(data)), ['2017-6-19','2018-7-1'], 'group items by date')
	t.is(d.groupByDate(data)['2017-6-19'].length, 3, 'group items by date')
	t.is(d.groupByDate(data)['2018-7-1'].length, 1, 'group items by date')
	t.is(data.length, size, 'should not change origin')
})

test('data.groupByTimeFrame', t => {
	const data = [
		null,'',false,true,{},new Date(),{date:'2016-1-19 13:30:01'},
		{date: new Date('2017-7-19 00:00:00')},
		{date: new Date('2018-7-19 5:59:59')},
		{date: new Date('2018-7-19 6:00:00')},
		{date: new Date('2018-7-19 11:59:59')},
		{date: new Date('2017-7-19 12:00:00')},
		{date: new Date('2017-7-19 17:59:59')},
		{date: new Date('2017-7-19 18:00:00')},
		{date: new Date('2017-7-19 23:59:59')}
	]
	const size = data.length
	t.deepEqual(Object.keys(d.groupByTimeFrame(data)), ['1','2','3','4'], 'group items by timeframe')
	t.deepEqual(d.groupByTimeFrame(data)['1'].length, 2, 'group items by timeframe')
	t.deepEqual(d.groupByTimeFrame(data)['2'].length, 2, 'group items by timeframe')
	t.deepEqual(d.groupByTimeFrame(data)['3'].length, 2, 'group items by timeframe')
	t.deepEqual(d.groupByTimeFrame(data)['4'].length, 2, 'group items by timeframe')
	t.is(data.length, size, 'should not change origin')
})

