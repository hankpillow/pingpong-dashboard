import {h} from 'preact'
import DataGroup from 'components/DataGroup'

const GenericSample = ({name, data}) => {

	if (!data || !name) return "missing required data."

	const thead = data.header.map(val => <th>{val}</th>)

	const tbody = data.rows.map((row, index) => {
			return (<tr className={row.style} key={name + '-row-' + index}>
				{row.data.map(val => <td>{val}</td>)}
			</tr>)
		})

	return (<div key={name}>
		<h2>{name}</h2>
		<table>
			<thead>
				<tr>
					<th><DataGroup name={name}/></th>
					{thead}
				</tr>
			</thead>
			<tbody>{tbody}</tbody>
		</table>
	</div>)
}

export default GenericSample
