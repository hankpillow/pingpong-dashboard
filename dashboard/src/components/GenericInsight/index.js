import {h} from 'preact'
import DataGroup from 'components/DataGroup'

const GenericSample = ({body, name}) => {

	if (!name) throw new Error('missing component name')

	if (body.length === 0) return ""

	const tbody = body.map(({columnDate, columnChecks, columnValue, statusClass}, index) => {
			return (<tr className={statusClass} key={'%name%-' + index}>
				<td>{columnDate}</td>
				<td>{columnChecks}</td>
				<td>{columnValue}%</td>
			</tr>)
		})

	return (<div>
		<h2>{name}</h2>
		<table>
			<thead>
				<tr>
					<th><DataGroup name={name}/></th>
					<th>checks</th>
					<th>%</th>
				</tr>
			</thead>
			<tbody>{tbody}</tbody>
		</table>
	</div>)
}

export default GenericSample
