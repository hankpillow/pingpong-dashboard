//@see https://stackoverflow.com/questions/1551382/user-friendly-time-format-in-python
//TODO allow int as args
const moment = (time, now = new Date()) => {
	let diff

	try {
		if (typeof time === 'string' && isNaN(Date.parse(time)) === false) {
			diff = now - new Date(time)
		} else if (time instanceof Date) {
			diff = now - time
		} else {
			return ''
		}
	} catch (err) {return 'cant process date'}

	const second_diff = parseInt(diff / 1000, 10)
	const day_diff =  parseInt(second_diff / 86400, 10)

	if (day_diff < 0) return ''

	if (day_diff === 0) {
		if (second_diff < 10) return "just now"
		if (second_diff < 60) return second_diff + " seconds ago"
		if (second_diff < 120) return "a minute ago"
		if (second_diff < 3600) return parseInt(second_diff / 60, 10) + " minutes ago"
		if (second_diff < 7200) return "an hour ago"
		if (second_diff < 86400) return parseInt(second_diff / 3600, 10) + " hours ago"
	}

	if (day_diff == 1) return "yesterday"
	if (day_diff < 7) return (day_diff) + " days ago"
	if (day_diff < 31) return parseInt(day_diff / 7, 10) + " weeks ago"
	if (day_diff < 365) return parseInt(day_diff / 30, 10) + " months ago"

	return parseInt(day_diff / 365, 10) + " years ago"
}

//@full credits to https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php/6117889#6117889
const getWeekNumber = date => {
	let d = new Date(+date);
	d.setHours(0,0,0);
	d.setDate(d.getDate()+4-(d.getDay()||7));
	return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
}

const WEEK_DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December']

const prettyDate = date =>  {
	if (!date) return ''
	if (typeof date === 'string') date = new Date(date)
	return `${WEEK_DAYS[date.getDay()].slice(0,2)} ${date.getDate()} ${MONTHS[date.getMonth()].slice(0,3)} ${date.getFullYear().toString().slice(2)}`
}

const prettyMonth = num => MONTHS[num]

const prettyWeekDay = num => WEEK_DAYS[num]

const prettyWeekNum = val => `${val}W`

const prettyTimeframe = val => {
	switch(parseInt(val, 10)) {
		case 1: return 'madrugada'
		case 2: return 'manha'
		case 3: return 'tarde'
		default: return 'noite'
	}
}

const prettyDay = val => {
	let end = val.toString()
	end = end.charAt(end.length-1)
	if (end == '1') return `${val}st`
	if (end == '2') return `${val}nd`
	if (end == '3') return `${val}rd`
	return `${val}th`
}

const prettyHour = val => `${val}h`

export {
	moment,
	getWeekNumber,
	prettyDate,
	prettyMonth,
	prettyWeekDay,
	prettyDay,
	prettyTimeframe,
	prettyHour,
	prettyWeekNum
}
