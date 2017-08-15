import {h} from 'preact'
import {connect} from 'preact-redux'
import {actions} from './store'

import ExitCodeList from './ExitCodeList'

/*eslint-disable*/
const DataGrid = ({group}, {store}) => {
	console.log(group)
	return (<div className={'data-group'}>
		<table>
			<thead>
				<tr>
					<th>foo</th>
					<th>checks</th>
					<th>error</th>
				</tr>
			</thead>
			<tbody>
				{group.map(g => {
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
export default connect(state => (state), actions)(DataGrid)



	// return (<div className={'data-group'}>
	// 	<select onchange={this.foo}>
	// 		<option value={'day'}>daily</option>
	// 		<option value={'hour'}>hour</option>
	// 		<option value={'week'}>weekly</option>
	// 	</select>
	// 	<table>
	// 		<thead>
	// 			<tr>
	// 				<th>foo</th>
	// 				<th>checks</th>
	// 				<th>error</th>
	// 			</tr>
	// 		</thead>
	// 		<tbody>
	// 			{group.map(g => {
	// 				const gName = colTimeFn(g[0].groupBy)
	// 				const errList = g.map(item => item.exit_code)
	// 				return (<tr><td>{gName}</td> <td>{g.length}</td><td>{errList.join('\n')}</td></tr>)
	// 			})}
	// 		</tbody>
	// 	</table>
	// 	</div>)

					// return (<tr><td>{gName}</td> <td>{g.length}</td><td><ExitCodeList data={errList} /></td></tr>)
// const TimeFilter = ({filter}) => {

// 		const updateFilter = (e) => {
// 			console.log('-----', e.target.value)
// 			// this.setState()
// 		}

// 		switch(filter) {
// 			case 'week':
// 				return (<select onchange={updateFilter}>
// 						<option value={'date'}>week</option>
// 						<option value={'pretty'}>pretty</option>
// 					</select>)
// 			case 'hour':
// 				return (<select onchange={updateFilter}>
// 						<option value={'date'}>time</option>
// 						<option value={'pretty'}>pretty</option>
// 					</select>)
// 			default:
// 				return (<select onchange={updateFilter}>
// 						<option value={'date'}>date</option>
// 						<option value={'pretty'}>pretty</option>
// 					</select>)
// 		}
// }
/*
	// </table>)
	// return <ul>
	// 	{group(data).map(list => {
	// 		return list.map(({date, exit_code}) => {
	// 			return <li> <time datetime={date}>{ single(tinyDate, date) }</time>
	// 			<a target={'_blank'} href={this.getURL(this.getCodeMsg([exit_code]))}>
	// 				{this.prettyError(this.getCodeMsg([exit_code]))}
	// 			</a>
	// 		</li>
	// 		})
	// 	})}
	// </ul>
	*/

// const Link = ({ children, ...props }) => (
// 	<a {...props}>{ children }</a>
// );

