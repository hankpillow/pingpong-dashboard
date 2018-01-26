import {h, render, Component} from 'preact'
import {connect} from 'preact-redux'
import {EnumMetrics} from 'api/typeDefs'

const options = EnumMetrics
  .map((metric, i) => <option key={i} value={metric}>{metric.replace('_',' ')}</option>)

const actionMapper = (dispatcher) => {
  return {
    onChange: event => dispatcher({type:'add',payload:event.target.value})
  }
}

@connect(null, actionMapper)
export default class CreateReport extends Component {
  render({onChange, reports}) {
      return (<form name="create-report">
        <select name="metric" onChange={onChange.bind(this)}>{options}</select>
    </form>)
  }
}
