import {promisify} from 'util'
import fs from 'fs'
import {normalize} from 'path'
import {curry, pluck, pick} from 'ramda'
import crypto from 'crypto'

const dbPath = normalize(__dirname + '/../../samples.json')

const loadAsyncFile = promisify(fs.readFile)

const filterPage = curry((id, data) => data.filter(item => getHash(item.url_effective) === id))

const reduceProps = curry((props, data) => data.map(item => pick(props, item)))

const getSeriesItem = curry((id, prop, list) => ({
  prop, id,
  dates: pluck('date', list),
  series: pluck(prop, list)
}))

const uniqueValues = list => list.filter((val, pos) => list.indexOf(val) === pos)

const getHash = url => crypto.createHash('md5').update(url).digest('hex')

const limitResult = curry((limit, sample) => ({
  ...sample,
  dates: sample.dates.slice(limit),
  series: sample.series.slice(limit)
}))


const toPageItem = list => list.map(url => ({ url, id: getHash(url) }))

const Query = {

  series(root, {id, prop, limit}) {
    return loadAsyncFile(dbPath)
      .then(JSON.parse)
      .then(filterPage(id))
      .then(reduceProps([prop, 'date']))
      .then(getSeriesItem(id, prop))
      .then(limitResult(limit < 0 ? limit : limit * -1))
  }
  , pages() {
    return loadAsyncFile(dbPath)
			.then(JSON.parse)
      .then(pluck('url_effective'))
			.then(uniqueValues)
			.then(toPageItem)
  }

}

export default {Query}
