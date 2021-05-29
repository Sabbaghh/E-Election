import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { ProjectFireStore } from '../FireBase/fireBase'
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
})

const CandidatesStats = ({ currentManifiestNameData, setToggleBackDrop }) => {
	useEffect(() => {
		currentManifiestNameData.sort((a, b) => {
			var nameA = a.N
			var nameB = b.N
			if (nameA < nameB) {
				return -1
			}
			if (nameA > nameB) {
				return 1
			}
			return 0
		})
	}, [])
	const classes = useStyles()
	return (
		<div className='candidateStats'>
			<button onClick={() => setToggleBackDrop(false)}>X</button>
			{currentManifiestNameData && (
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Candidate Name</TableCell>
								<TableCell align='right'>Candidate ID</TableCell>
								<TableCell align='right'>Total votes</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{currentManifiestNameData.map((row) => (
								<TableRow key={row.name}>
									<TableCell component='th' scope='row'>
										{row.Name}
									</TableCell>
									<TableCell align='right'>{row.ID}</TableCell>
									<TableCell align='right'>{row.N}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</div>
	)
}

export default CandidatesStats
