import {h} from 'preact'
import {connect} from 'preact-redux'
import DataGroup from 'components/DataGroup'

const GenericSample = ({body}) => {

	if (body.length === 0) return ""

	const tbody = body.map(({columnDate, columnChecks, columnValue, statusClass}, index) => {
			return (<tr className={statusClass} key={'%name%-' + index}>
				<td>{columnDate}</td>
				<td>{columnChecks}</td>
				<td>{columnValue}%</td>
			</tr>)
		})

	const refreshData = (value) => {
		console.log('chabnges' + value)
	}

	return (<div className={'insight'}>
		<h2>%Name%</h2>
		<table>
			<thead>insights
				<tr>
					<th><DataGroup /></th>
					<th>checks</th>
					<th>%name%</th>
				</tr>
			</thead>
			<tbody>{tbody}</tbody>
		</table>
	</div>)
}

export default GenericSample
