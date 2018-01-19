import {promisify} from 'util'
import fs from 'fs'
import {normalize} from 'path'
import {curry, pluck} from 'ramda'

const db = normalize(__dirname + '/../samples.json')

const loadAsyncFile = promisify(fs.readFile)

const reduceProps = curry((props, data) => pick(props, data))

const serializeSampleItem = curry((prop, list) => ({
  prop: prop,
  dates: pluck('date', list),
  series: pluck(prop, list)
}))

const limitResult = curry((limit, {prop, dates, series}) => ({
  prop,
  dates: dates.slice(limit),
  series: series.slice(limit)
}))

const Query = {

  uptime: (root, {prop, limit}) =>
    loadAsyncFile(db)
      .then(JSON.parse)
      .then(Promise.resolve(reduceProps([prop, 'date'])))
      .then(serializeSampleItem(prop))
      .then(limitResult(limit < 0 ? limit : limit * -1))

}

export default { Query }
