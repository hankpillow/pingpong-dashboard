import {promisify} from 'util'
import fs from 'fs'
import {normalize} from 'path'
import {curry, pluck, pick} from 'ramda'

const dbPath = normalize(__dirname + '/../../samples.json')

const loadAsyncFile = promisify(fs.readFile)

const filterPage = curry((url, data) => data.filter(item => item.url_effective === url))

const reduceProps = curry((props, data) => data.map(item => pick(props, item)))

const getSeriesItem = curry((url, prop, list) => ({
  prop, url,
  dates: pluck('date', list),
  series: pluck(prop, list)
}))

const uniqueValues = list => list.filter((val, pos) => list.indexOf(val) === pos)

const limitResult = curry((limit, sample) => ({
  ...sample,
  dates: sample.dates.slice(limit),
  series: sample.series.slice(limit)
}))

const Query = {

  series(root, {url, prop, limit}) {
    return loadAsyncFile(dbPath)
      .then(JSON.parse)
      .then(filterPage(url))
      .then(reduceProps([prop, 'date']))
      .then(getSeriesItem(url, prop))
      .then(limitResult(limit < 0 ? limit : limit * -1))
  }
  , pages() {
    return loadAsyncFile(dbPath)
			.then(JSON.parse)
      .then(pluck('url_effective'))
			.then(uniqueValues)
  }

}

export default {Query}
