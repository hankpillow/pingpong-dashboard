import {h} from 'preact'
import {connect} from 'preact-redux'

import ExitCodeList from './ExitCodeList'
import DateFormatter from 'insights/DateFormatter'

const DataGrid = ({data}, {store}) => {
	return (<div className={'data-group'}>
		<table>
			<thead>
				<tr>
					<th><DateFormatter/></th>
					<th>checks</th>
					<th>error</th>
				</tr>
			</thead>
			<tbody>
				{data.map(g => {
					const gName = g[0].groupBy
					const errList = g.map(item => item.exit_code)
					return (<tr>
							<td>{gName}</td>
							<td>{g.length}</td>
							<td><ExitCodeList data={errList} /></td>
						</tr>)
				})}
			</tbody>
		</table>
	</div>)
}

export default connect(state => ({data:state.data}), () => ({}))(DataGrid)
