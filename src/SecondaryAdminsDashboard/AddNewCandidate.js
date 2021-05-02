import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { ProjectFireStore } from '../FireBase/fireBase'
import Logo from '../assests/logo/e-election-logo.png'
import axios from 'axios'

const AddNewCandidate = ({
	setNewCandidateBackDrop,
	addNewCandidate,
	currentManifest,
	currentCollegeName,
}) => {
	const [ID, setID] = useState('')
	const [IDControl, setIDControl] = useState(false)
	const [toggle, setToggle] = useState(true)
	const [studentData, setStudentData] = useState('')
	const [Letter, setLetter] = useState('')
	const getCandidatesData = (ID) => {
		try {
			axios
				.get(`https://e-election-e4023.firebaseio.com/Student/${ID}/.json`)
				.then((res) => {
					if (!res?.data) {
						alert(`there is no student with this ID`)
					} else {
						setStudentData(res?.data)
						setToggle(false)
					}
				})
		} catch {
			alert(`something went wrong`)
		}
	}
	return (
		<div className='AddNewCandidateForm'>
			{toggle ? (
				<>
					<div className='LogoContainer'>
						<img src={Logo} alt='logo' />
					</div>
					<TextField
						type='text'
						variant='outlined'
						label='Search by student ID'
						required
						color={IDControl ? 'primary' : 'secondary'}
						value={ID}
						onChange={(e) => {
							setID(e.target.value)
							setIDControl(true)
							e.target.value.length > 6
								? setIDControl(true)
								: setIDControl(false)
						}}
						placeholder='1831690'
					/>
					<div>
						<Button
							variant='contained'
							color='primary'
							size='large'
							disabled={!IDControl}
							type='button'
							onClick={() =>
								ID ? getCandidatesData(ID) : alert('Please insert and ID')
							}
						>
							submit
						</Button>
						<Button
							variant='contained'
							color='primary'
							type='button'
							size='large'
							onClick={() => {
								setNewCandidateBackDrop(false)
								setToggle(false)
							}}
						>
							Cancel
						</Button>
					</div>
				</>
			) : (
				<>
					{studentData && (
						<>
							<div className='studentData'>
								{studentData.Image && (
									<div className='LogoContainer'>
										<img src={studentData.Image} alt='logo' />
									</div>
								)}

								<p>
									Name : <span>{studentData.Name}</span>
								</p>
								<p>
									ID : <span>{studentData.ID}</span>
								</p>
								<p>
									Warnings :{' '}
									<span>
										{studentData.Alert ? (
											<span>
												YES <span className='incorrect'>X</span>
											</span>
										) : (
											<span>
												NO <span className='correct'>&#10003; </span>
											</span>
										)}
									</span>
								</p>
								<p>
									Belong to the Collage :{' '}
									<span>
										{studentData.Department === currentCollegeName ? (
											<span>
												YES <span className='correct'>&#10003;</span>
											</span>
										) : (
											<span>
												NO <span className='incorrect'>X </span>
											</span>
										)}
									</span>
								</p>
								<p>
									GPA :{' '}
									<span>
										{studentData.GPA}{' '}
										{studentData.GPA >= 2.5 ? (
											<span className='correct'>&#10003; </span>
										) : (
											<span className='incorrect'>X</span>
										)}
									</span>
								</p>
								<p>
									Already a candidate:{' '}
									<span>
										{studentData.IsCandidate ? (
											<span>
												YES
												<span className='incorrect'>X</span>
											</span>
										) : (
											<span>
												NO
												<span className='correct'>&#10003;</span>
											</span>
										)}
									</span>
								</p>
								{studentData.GPA >= 2.5 &&
									!studentData.Alert &&
									studentData.Department === currentCollegeName &&
									!studentData.IsCandidate && (
										<div className='LetterInput'>
											<TextField
												type='text'
												variant='outlined'
												multiline
												rows={2}
												label='Add letter for student'
												color='primary'
												value={Letter}
												onChange={(e) => {
													setLetter(e.target.value)
												}}
												placeholder='Vote for me'
											/>
										</div>
									)}
							</div>
							<div>
								<Button
									variant='contained'
									color='primary'
									size='large'
									disabled={
										!(
											studentData.GPA >= 2.5 &&
											!studentData.Alert &&
											studentData.Department === currentCollegeName &&
											!studentData.IsCandidate
										)
									}
									type='button'
									onClick={() =>
										addNewCandidate(
											studentData.Name,
											studentData.ID,
											Letter,
											studentData.Image,
											currentManifest,
											setToggle,
										)
									}
								>
									submit
								</Button>
								<Button
									variant='contained'
									color='primary'
									type='button'
									size='large'
									onClick={() => {
										setToggle(true)
									}}
								>
									BACK
								</Button>
							</div>
						</>
					)}
				</>
			)}
		</div>
	)
}
export default AddNewCandidate
