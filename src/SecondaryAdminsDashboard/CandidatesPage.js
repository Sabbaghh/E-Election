import React, { useState, useContext } from 'react'
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
import { Context } from './SecondaryAdminsDashboard'
import './styles/CandidatesPage.scss'
const imgdemo = 'https://www.w3schools.com/howto/img_avatar.png'
const CandidatesPage = ({
	addNewCandidate,
	changeCandidateLetter,
	deleteCandidate,
	currentCollegeName,
}) => {
	const { currentManifest, candidates } = useContext(Context)
	const [currentCandidateData, setCurrentCandidateData] = useState('')
	const [toggleBackDrop, setToggleBackDrop] = useState(false)
	const [DeleteBackDrop, setDeleteBackDrop] = useState(false)
	const [LetterBackDrop, setLetterBackDrop] = useState(false)
	const [NewCandidateBackDrop, setNewCandidateBackDrop] = useState(false)
	const [CandidateLetter, setCandidateLetter] = useState('')
	const [LetterControl, setLetterControl] = useState(true)

	const useStyles = makeStyles({
		root: {
			maxWidth: 345,
			margin: 15,
		},
	})
	const classes = useStyles()
	return (
		<>
			{/* ~ADD CANDIDATE */}
			<button
				className='addCandidateBTN'
				type='button'
				onClick={() => setNewCandidateBackDrop(true)}
			>
				Add New candidate
			</button>
			{NewCandidateBackDrop && (
				<BackDrop>
					<AddNewCandidate
						setNewCandidateBackDrop={setNewCandidateBackDrop}
						addNewCandidate={addNewCandidate}
						currentManifest={currentManifest}
						currentCollegeName={currentCollegeName}
					/>
				</BackDrop>
			)}
			{/* ~END */}

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
									label='Change Letter'
									multiline
									rows={2}
									className='input'
									value={CandidateLetter}
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
														color='secondary'
														onClick={() => {
															changeCandidateLetter(
																CandidateLetter,
																currentCandidateData,
																currentManifest,
																setToggleBackDrop,
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
											setCandidateLetter(currentCandidateData.Letter)
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
													deleteCandidate(currentCandidateData, currentManifest)
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
			<Grid
				container
				direction='row'
				justify='space-between"'
				alignItems='center'
				className='CandidatesPage'
			>
				{candidates ? (
					candidates.map((candidate) => {
						return (
							<Card
								key={candidate.ID}
								className={classes.root}
								onClick={() => {
									setToggleBackDrop(true)
									setCurrentCandidateData(candidate)
									setCandidateLetter(candidate.Letter)
								}}
							>
								<CardActionArea>
									<CardMedia
										component='img'
										alt='Contemplative Reptile'
										height='150'
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
											{candidate.Letter}
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
					})
				) : (
					<div>there are no candidates</div>
				)}
			</Grid>
		</>
	)
}

export default CandidatesPage
