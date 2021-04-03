import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import BackDrop from '../Shared/BackDrop'
import CloseIcon from '@material-ui/icons/Close'
import AddNewCandidate from './AddNewCandidate'
import './styles/CandidatesPage.scss'
const imgdemo = 'https://www.w3schools.com/howto/img_avatar.png'
const qrCodeDemo =
	'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'

const CandidatesPage = ({
	addNewCandidate,
	changeCandidateName,
	changeCandidateLetter,
	deleteCandidate,
}) => {
	const [currentCandidateData, setCurrentCandidateData] = useState('')
	const [toggleBackDrop, setToggleBackDrop] = useState(false)
	const [DeleteBackDrop, setDeleteBackDrop] = useState(false)
	const [NameBackDrop, setNameBackDrop] = useState(false)
	const [LetterBackDrop, setLetterBackDrop] = useState(false)
	const [NewCandidateBackDrop, setNewCandidateBackDrop] = useState(false)
	const [CandidateName, setCandidateName] = useState('')
	const [NameControl, setNameControl] = useState(true)
	const [CandidateLetter, setCandidateLetter] = useState('')
	const [LetterControl, setLetterControl] = useState(true)

	const useStyles = makeStyles({
		root: {
			maxWidth: 345,
			margin: 15,
		},
	})
	const classes = useStyles()
	const studentsDemo = [
		{
			Image: imgdemo,
			Name: 'studentDemo',
			Late: 'Vote For Me',
			QRcode: qrCodeDemo,
			ID: 1831690,
		},
		{
			Image: imgdemo,
			Name: 'studentDemo',
			Late: 'Vote For Me',
			QRcode: qrCodeDemo,
			ID: 1831692,
		},
	]
	return (
		<>
			{NewCandidateBackDrop && (
				<BackDrop>
					<AddNewCandidate
						setNewCandidateBackDrop={setNewCandidateBackDrop}
						addNewCandidate={addNewCandidate}
					/>
				</BackDrop>
			)}
			{toggleBackDrop && (
				<BackDrop>
					<form className='AddCandidateForm'>
						<Grid
							container
							direction='column'
							justify='center'
							alignItems='center'
						>
							<Button
								type='button'
								className='closeButton'
								startIcon={<CloseIcon />}
								onClick={() => setToggleBackDrop(false)}
							></Button>
							<h1 style={{ color: '#000' }}>
								{currentCandidateData.Name}'s Informations
							</h1>
							<div className='avatarContainer'>
								<img
									src={
										currentCandidateData.Image
											? currentCandidateData.Image
											: imgdemo
									}
									alt='avatar'
								/>
							</div>
							<div>
								<TextField
									type='text'
									variant='outlined'
									label='name'
									className='input'
									value={
										currentCandidateData.Name && NameControl
											? currentCandidateData.Name
											: CandidateName
									}
									onChange={(e) => setCandidateName(e.target.value)}
									disabled={NameControl}
								/>
								<div className='controlButtons'>
									<Button
										type='button'
										size='large'
										variant='outlined'
										onClick={() => {
											setCandidateName(currentCandidateData.Name)
											setNameControl(false)
										}}
										disabled={!NameControl}
									>
										change
									</Button>
									<Button
										type='button'
										size='large'
										variant='outlined'
										color='primary'
										disabled={NameControl}
										onClick={() => setNameBackDrop(true)}
									>
										save
									</Button>
									{NameBackDrop && (
										<BackDrop>
											<div className='SureMsg'>
												<p>Are you sure you want to save?</p>
												<div className='controlButtons'>
													<Button
														type='button'
														size='large'
														variant='outlined'
														color='Secondary'
														onClick={() => {
															changeCandidateName(
																CandidateName,
																currentCandidateData.Name,
															)
															setNameBackDrop(false)
															setNameControl(false)
															setNameControl(true)
														}}
													>
														Save
													</Button>
													<Button
														type='button'
														size='large'
														variant='outlined'
														color='primary'
														onClick={() => setNameBackDrop(false)}
													>
														Cancel
													</Button>
												</div>
											</div>
										</BackDrop>
									)}

									<Button
										type='button'
										size='large'
										variant='outlined'
										color='secondary'
										disabled={NameControl}
										onClick={() => {
											setCandidateName(currentCandidateData.Name)
											setNameControl(true)
										}}
									>
										Cancel
									</Button>
								</div>
							</div>
							<div>
								<TextField
									label='Letter'
									multiline
									rows={2}
									className='input'
									value={
										currentCandidateData.Name && LetterControl
											? currentCandidateData.Late
											: CandidateLetter
									}
									onChange={(e) => setCandidateLetter(e.target.value)}
									disabled={LetterControl}
									variant='outlined'
								/>
								<div className='controlButtons'>
									<Button
										type='button'
										size='large'
										variant='outlined'
										onClick={() => {
											setCandidateLetter(currentCandidateData.Late)
											setLetterControl(false)
										}}
										disabled={!LetterControl}
									>
										change
									</Button>
									<Button
										type='button'
										size='large'
										variant='outlined'
										color='primary'
										disabled={LetterControl}
										onClick={() => setLetterBackDrop(true)}
									>
										Save
									</Button>
									{LetterBackDrop && (
										<BackDrop>
											<div className='SureMsg'>
												<p>Are you sure you want to save?</p>
												<div className='controlButtons'>
													<Button
														type='button'
														size='large'
														variant='outlined'
														color='Secondary'
														onClick={() => {
															changeCandidateLetter(
																CandidateLetter,
																currentCandidateData.Late,
															)
															setLetterBackDrop(false)
															setLetterControl(true)
														}}
													>
														Save
													</Button>
													<Button
														type='button'
														size='large'
														variant='outlined'
														color='primary'
														onClick={() => setLetterBackDrop(false)}
													>
														Cancel
													</Button>
												</div>
											</div>
										</BackDrop>
									)}
									<Button
										type='button'
										size='large'
										variant='outlined'
										color='secondary'
										disabled={LetterControl}
										onClick={() => {
											setCandidateLetter(currentCandidateData.Late)
											setLetterControl(true)
										}}
									>
										Cancel
									</Button>
								</div>
							</div>
							<Button
								variant='contained'
								color='secondary'
								size='large'
								type='button'
								onClick={() => setDeleteBackDrop(true)}
							>
								Delete Candidate
							</Button>
							{DeleteBackDrop && (
								<BackDrop>
									<div className='SureMsg'>
										<p style={{ textAlign: 'center' }}>
											Are you sure you want to Delete
											<h3>{currentCandidateData.Name}</h3> from this manifest ?
										</p>
										<div className='controlButtons'>
											<Button
												type='button'
												size='large'
												variant='outlined'
												color='Secondary'
												onClick={() => {
													deleteCandidate()
													setDeleteBackDrop(false)
													setToggleBackDrop(false)
												}}
											>
												Delete
											</Button>
											<Button
												type='button'
												size='large'
												variant='outlined'
												color='primary'
												onClick={() => setDeleteBackDrop(false)}
											>
												Cancel
											</Button>
										</div>
									</div>
								</BackDrop>
							)}
						</Grid>
					</form>
				</BackDrop>
			)}
			<Button
				variant='contained'
				size='small'
				color='primary'
				type='button'
				onClick={() => setNewCandidateBackDrop(true)}
			>
				Add New candidate
			</Button>
			<Grid
				container
				direction='row'
				justify='space-between"'
				alignItems='center'
				className='CandidatesPage'
			>
				{studentsDemo.map((candidate) => {
					return (
						<Card
							key={candidate.ID}
							className={classes.root}
							onClick={() => {
								setToggleBackDrop(true)
								setCurrentCandidateData(candidate)
							}}
						>
							<CardActionArea>
								<CardMedia
									component='img'
									alt='Contemplative Reptile'
									height='200'
									image={candidate.Image ? candidate.Image : imgdemo}
									title='Contemplative Reptile'
								/>
								<CardContent>
									<Typography gutterBottom variant='h5' component='h2'>
										{candidate.Name}
									</Typography>
									<Typography
										variant='body2'
										color='textSecondary'
										component='p'
									>
										{candidate.Late}
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Button
									onClick={() => {
										setToggleBackDrop(true)
										setCurrentCandidateData(candidate)
									}}
									size='small'
									color='primary'
								>
									Learn More
								</Button>
							</CardActions>
						</Card>
					)
				})}
			</Grid>
		</>
	)
}

export default CandidatesPage
