import React, { useState, useEffect } from 'react'
import './css/statistics.css'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Backdrop from '@material-ui/core/Backdrop'
import CandidateStat from './CandidatesStats'
import { ProjectFireStore } from '../FireBase/fireBase'
import { CompassCalibrationOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	table: {
		minWidth: 650,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}))

const Statistics = () => {
	const [colleges, seColleges] = useState('')
	const [currentCollege, setCurrentCollege] = useState('')
	const [currentCollegeData, setCurrentCollegeData] = useState('')
	const [dataRows, setDataRows] = useState()
	const [toggleBackDrop, setToggleBackDrop] = useState(false)
	const [currentManifiestNameData, setCurrentManifiestNameData] = useState([])

	const rows = []

	const formatRows = (
		Name,
		TotalVotes,
		totalSeatNumber,
		TotalCollegesVotes,
	) => {
		const hadAtabeh = Math.floor(parseInt(TotalCollegesVotes) / totalSeatNumber)
		const winningSeats = Math.floor(TotalVotes / hadAtabeh)
		const theRestOfVotes = TotalVotes % hadAtabeh
		return { Name, TotalVotes, theRestOfVotes, winningSeats }
	}
	const getCurrentManifiestData = (collegeName, manifiestName) => {
		ProjectFireStore.collection('Collage')
			.doc(collegeName)
			.collection('Manifiest')
			.doc(manifiestName)
			.collection('Candidates')
			.onSnapshot((snap) => {
				let docs = []
				snap.docs.map((doc) => {
					docs.push(doc.data())
				})
				docs.sort((a, b) => {
					var nameA = a.N
					var nameB = b.N
					if (nameA < nameB) {
						return 1
					}
					if (nameA > nameB) {
						return -1
					}
					return 0
				})
				if (docs.length > 0) {
					setCurrentManifiestNameData(docs)
				}
			})
	}

	const classes = useStyles()
	const handleChange = async (event) => {
		setCurrentCollege(event.target.value)
		const manifiestsData = []
		await ProjectFireStore.collection('Collage')
			.doc(event.target.value)
			.collection('Manifiest')
			.get()
			.then((res) => {
				res.docs.forEach((doc) => {
					manifiestsData.push(doc.data())
				})
			})
		if (manifiestsData.length > 0) {
			setCurrentCollegeData(manifiestsData)
			//getTotalSeatNumbers
			await ProjectFireStore.collection('Collage')
				.doc(event.target.value)
				.onSnapshot((snap) => {
					const TotalCollegesSeatsNumber = snap.data().seatsNumber
					const TotalCollegesVotes = snap.data().N
					//format Data
					manifiestsData.forEach((el) => {
						if (el.N) {
							rows.push(
								formatRows(
									el.Name, // manifiest name
									el.N, //manifiest totalvotes
									TotalCollegesSeatsNumber,
									TotalCollegesVotes,
								),
							)
						}
					})
					let numberOfSummationForSeats = 0
					rows.forEach((row, i) => {
						numberOfSummationForSeats += row.winningSeats
					})
					rows.sort((a, b) => {
						var nameA = a.theRestOfVotes
						var nameB = b.theRestOfVotes
						if (nameA < nameB) {
							if (a.winningSeats > b.winningSeats) {
								return 1
							}
							return 1
						}
						if (nameA > nameB) {
							if (a.winningSeats < b.winningSeats) {
								return -1
							}
							return -1
						}
						if (a.winningSeats < b.winningSeats) {
							return -1
						}
						return 0
					})
					if (numberOfSummationForSeats < TotalCollegesSeatsNumber) {
						for (
							var i = 0;
							i < TotalCollegesSeatsNumber - numberOfSummationForSeats;
							i++
						) {
							rows[i].winningSeats = rows[i].winningSeats + 1
						}
					}
					rows.sort((a, b) => {
						var nameA = a.TotalVotes
						var nameB = b.TotalVotes
						if (nameA < nameB) {
							return 1
						}
						if (nameA > nameB) {
							return -1
						}
						return 0
					})
					if (rows.length > 0) {
						setDataRows(rows)
					}
				})
		}
	}

	//get colleges names
	const getCollegesNames = async () => {
		const collegesArr = []
		await ProjectFireStore.collection('Collage')
			.where('N', '>', 0)
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					collegesArr.push(doc.data().Name)
				})
			})
		if (collegesArr.length > 0) {
			seColleges(collegesArr)
		}
	}
	useEffect(() => {
		getCollegesNames()
	}, [])
	return (
		<div className='statisticsContainer'>
			<h1>Choose the college to get statistics</h1>
			{colleges && colleges ? (
				<FormControl className={classes.formControl}>
					<InputLabel id='demo-simple-select-label'>college</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={currentCollege}
						onChange={handleChange}
					>
						{colleges.map((el) => {
							return (
								<MenuItem key={el} value={el}>
									{el}
								</MenuItem>
							)
						})}
					</Select>
				</FormControl>
			) : (
				<div>there are no statistics right now</div>
			)}

			{currentCollege && currentCollegeData ? (
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align='right'>Total votes</TableCell>
								<TableCell align='right'>The remaining votes</TableCell>
								<TableCell align='right'>Winning seats</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{dataRows &&
								dataRows.map((row) => (
									<TableRow
										onClick={() => {
											getCurrentManifiestData(currentCollege, row.Name)
											setToggleBackDrop(true)
										}}
										key={row.Name}
									>
										<TableCell component='th' scope='row'>
											{row.Name}
										</TableCell>
										<TableCell align='right'>{row.TotalVotes}</TableCell>
										<TableCell align='right'>{row.theRestOfVotes}</TableCell>
										<TableCell align='right'>{row.winningSeats}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<div></div>
			)}
			<Backdrop className={classes.backdrop} open={toggleBackDrop}>
				<CandidateStat
					setToggleBackDrop={setToggleBackDrop}
					currentManifiestNameData={currentManifiestNameData}
				/>
			</Backdrop>
		</div>
	)
}
export default Statistics
