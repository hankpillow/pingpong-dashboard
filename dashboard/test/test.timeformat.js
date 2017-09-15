import test from 'ava';
import * as timeformat from '../src/modules/timeformat'

const zero = new Date('2017-7-20 15:30:00')

test('timeformat.moment should handle invalid params', t => {
	const msg =  'should return empty string for invalid args'
	t.is(timeformat.moment(1),'', msg)
	t.is(timeformat.moment('foo'), '', msg)
	t.is(timeformat.moment(false), '', msg)
})

test('timeformat.moment "just now"', t => {
	const msg = 'when time diff < 10s'
	t.is(timeformat.moment(zero, zero),'just now', msg)
	t.is(timeformat.moment(new Date('2017-07-20 15:29:59'), zero), 'just now', msg)
})

test('timeformat.moment "N seconds ago"', t => {
	const msg = 'when time diff <60s'
	t.is(timeformat.moment(new Date('2017-07-20 15:29:50'), zero), '10 seconds ago', msg)
	t.is(timeformat.moment(new Date('2017-07-20 15:29:01'), zero), '59 seconds ago', msg)
})

test('timeformat.moment "a minute ago"', t => {
	const msg = 'when time diff <120s'
	t.is(timeformat.moment(new Date('2017-07-20 15:29:00'), zero), 'a minute ago', msg)
	t.is(timeformat.moment(new Date('2017-07-20 15:28:59'), zero), 'a minute ago', msg)
})

test('timeformat.moment "N minutes ago"', t => {
	const msg = 'when time diff <3600s'
	t.is(timeformat.moment(new Date('2017-07-20 15:28:00'), zero), '2 minutes ago', msg)
	t.is(timeformat.moment(new Date('2017-07-20 14:30:01'), zero), '59 minutes ago', msg)
})

test('timeformat.moment "a hour ago"', t => {
	const msg = 'when time diff <7200s'
	t.is(timeformat.moment(new Date('2017-07-20 14:30:00'), zero), 'an hour ago', msg)
	t.is(timeformat.moment(new Date('2017-07-20 13:30:01'), zero), 'an hour ago', msg)
})

test('timeformat.moment "N hours ago"', t => {
	const msg = 'when time diff <86400s'
	t.is(timeformat.moment(new Date('2017-07-20 13:29:59'), zero), '2 hours ago', msg)
	t.is(timeformat.moment(new Date('2017-07-19 15:30:01'), zero), '23 hours ago', msg)
})

test('timeformat.moment "yesterday"', t => {
	const msg = 'when time diff <2d'
	t.is(timeformat.moment(new Date('2017-07-19 15:30:00'), zero), 'yesterday', msg)
	t.is(timeformat.moment(new Date('2017-07-18 15:30:01'), zero), 'yesterday', msg)
})

test('timeformat.moment "N days ago"', t => {
	const msg = 'when time diff <7d'
	t.is(timeformat.moment(new Date('2017-07-18 15:30:00'), zero), '2 days ago', msg)
	t.is(timeformat.moment(new Date('2017-07-13 15:30:01'), zero), '6 days ago', msg)
})

test('timeformat.moment "N weeks ago"', t => {
	const msg = 'when time diff <31d'
	t.is(timeformat.moment(new Date('2017-07-13 15:30:00'), zero), '1 weeks ago', msg)
	t.is(timeformat.moment(new Date('2017-06-19 15:30:01'), zero), '4 weeks ago', msg)
})

test('timeformat.moment "N months ago"', t => {
	const msg = 'when time diff <365d'
	t.is(timeformat.moment(new Date('2017-06-19 15:30:00'), zero), '1 months ago', msg)
	t.is(timeformat.moment(new Date('2016-07-20 15:30:01'), zero), '12 months ago', msg)
})

test('timeformat.moment "N years ago"', t => {
	const msg = 'when time diff >365d'
	t.is(timeformat.moment(new Date('2016-07-20 15:30:00'), zero), '1 years ago', msg)
	t.is(timeformat.moment(new Date('2015-07-20 15:30:00'), zero), '2 years ago', msg)
})

test('timeformat.tinyDate', t => {
	const data = [
		new Date('2017-1-01 13:30:01'),
		new Date('2017-1-02 13:30:01'),
		new Date('2017-1-03 13:30:01'),
		new Date('2017-1-04 13:30:01'),
		new Date('2017-1-05 13:30:01'),
		new Date('2017-1-06 13:30:01'),
		new Date('2017-1-07 13:30:01'),
		new Date('2017-2-01 13:30:01'),
		new Date('2017-3-01 13:30:01'),
		new Date('2017-4-01 13:30:01'),
		new Date('2017-5-01 13:30:01'),
		new Date('2017-6-01 13:30:01'),
		new Date('2017-7-01 13:30:01'),
		new Date('2017-8-01 13:30:01'),
		new Date('2017-9-01 13:30:01'),
		new Date('2017-10-01 13:30:01'),
		new Date('2017-11-01 13:30:01'),
		new Date('2017-12-01 13:30:01'),
	]

	const expected = [
		'Su 1 Jan 17',
		'Mo 2 Jan 17',
		'Tu 3 Jan 17',
		'We 4 Jan 17',
		'Th 5 Jan 17',
		'Fr 6 Jan 17',
		'Sa 7 Jan 17',
		'We 1 Feb 17',
		'We 1 Mar 17',
		'Sa 1 Apr 17',
		'Mo 1 May 17',
		'Th 1 Jun 17',
		'Sa 1 Jul 17',
		'Tu 1 Aug 17',
		'Fr 1 Sep 17',
		'Su 1 Oct 17',
		'We 1 Nov 17',
		'Fr 1 Dec 17'
	]

	data.forEach((date, index) => {
		t.deepEqual(timeformat.prettyDate(date), expected[index] , 'prettyDate must match: ' + expected[index])
	})

})

test('timeformat.getWeekNumber', t => {
	// https://www.epochconverter.com/weeks/2017
	// every item represets index+1 week for that year
	const weeks = [
		"January 2, 2017","January 9, 2017", "January 16, 2017", "January 23, 2017", "January 30, 2017",
		"February 6, 2017", "February 13, 2017", "February 20, 2017", "February 27, 2017",
		"March 6, 2017", "March 13, 2017", "March 20, 2017", "March 27, 2017",
		"April 3, 2017", "April 10, 2017", "April 17, 2017", "April 24, 2017",
		"May 1, 2017", "May 8, 2017", "May 15, 2017", "May 22, 2017", "May 29, 2017",
		"June 5, 2017", "June 12, 2017", "June 19, 2017", "June 26, 2017",
		"July 3, 2017", "July 10, 2017", "July 17, 2017", "July 24, 2017", "July 31, 2017",
		"August 7, 2017", "August 14, 2017", "August 21, 2017", "August 28, 2017",
		"September 4, 2017", "September 11, 2017", "September 18, 2017", "September 25, 2017",
		"October 2, 2017", "October 9, 2017", "October 16, 2017", "October 23, 2017", "October 30, 2017",
		"November 6, 2017", "November 13, 2017", "November 20, 2017", "November 27, 2017",
		"December 4, 2017", "December 11, 2017", "December 18, 2017", "December 25, 2017",
	]
	weeks.forEach((d,weekNum) => {
		t.is(timeformat.getWeekNumber(new Date(d)), weekNum+1, 'week must match:' + d)
	})
})

