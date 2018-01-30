import {h, render, Component} from 'preact'
import {connect} from 'preact-redux'
import {EnumMetrics} from 'api/typeDefs'
import queryPages from 'api/queries'

const metrics = EnumMetrics.map((metric, i) =>
  <option key={i} value={metric}>{metric.replace('_',' ')}</option>)

const actionMapper = (dispatcher) => {
	const getPayload = ({elements}) => ({
		url:elements.metric.value,
		metric:elements.url.value
	})
  return {
    addReport: event => dispatcher({type:'add report',payload:getPayload(event.target.form)}),
    addUrl: url => dispatcher({type:'add url',payload:url})
  }
}

const stateMapper = state => state

@connect(stateMapper, actionMapper)
export default class CreateReport extends Component {

	constructor(props){
		super(props)
		this.addUrl = props.addUrl
	}

	notifyError() {
		console.error('failed to get pages')
	}

  componentDidMount(a,b){
    fetch(`//localhost:3000/api?query=${queryPages}`)
      .then(res => res.json())
      .then(json => json.data && json.data.pages && json.data.pages)
			.then(this.addUrl)
      .catch(this.notifyError.bind(this))
  }

	setReady() {
		this.setState({ready:true})
	}

  render({addReport, reports, urls}) {
			if (urls.length == 0) {
				return (<div className={'loading'}>loading</div>)
			}

			urls = urls.map(url => <option>{url}</option>)
      return (
				<form name="create-report">
					<h1>{this.state.ready}</h1>
					<select name="url" onChange={this.setReady.bind(this)}>
						<option>choose a url</option>
						{urls}
					</select>
					{this.state.ready &&
					<select name="metric" onChange={addReport.bind(this)}>
						<option>choose a metric</option>
						{metrics}
					</select>
					}
			</form>)
  }
}
