import {h, render, Component} from 'preact'
import {connect} from 'preact-redux'

const stateMapper = (state) => ({reports:state})

@connect(stateMapper)
export default class Reports extends Component {
  render({reports}) {
      return (<section name={'reports'}>
          <span>{reports.length}</span>
    </section>)
  }
}
