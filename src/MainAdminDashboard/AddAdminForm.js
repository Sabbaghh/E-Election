import React, { useState, useContext, useEffect } from 'react'
import Spinner from '../Shared/Spinner'
import { ProjectFireStore } from '../FireBase/fireBase'
import { DashboardContext } from './MainAdminDashBoard'
import { SecondaryAdmins } from '../FireBase/SecondaryAdminAuth'
import './css/AddAdminForm.css'

const AddAdminForm = () => {
	const [toggle, setToggle] = useState(false)
	const [show, setShow] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [currentData, setCurrentData] = useState('')
	const { currentCollege } = useContext(DashboardContext)
	const [active, setActive] = useState(false)
	const [TotalNumberOfSeats, setTotalNumberOfSeats] = useState(0)
	const CreateNewSecondaryAdmin = (email, PWD) => {
		return SecondaryAdmins.createUserWithEmailAndPassword(email, PWD)
	}
	//AddCollegeSeats
	const [SeatsfromInput, setSeatsFromInput] = useState(0)
	const [disable, setDisable] = useState(true)
	const [currentNumberOfSeats, setCurrentNumberOfSeats] = useState(0)
	const inputChange = (e) => {
		setSeatsFromInput(e.target.value)
	}
	const addSeats = () => {
		console.log(currentCollege, SeatsfromInput, currentData)
		ProjectFireStore.collection('Collage')
			.doc(currentCollege)
			.set({ ...currentData, seatsNumber: SeatsfromInput })
			.then(() => {
				setDisable(true)
				setLoading(false)
				setError('')

				ProjectFireStore.collection('Config')
					.doc('NSeatTotal')
					.set({ Number: TotalNumberOfSeats - SeatsfromInput })
					.then((res) => {
						console.log(res)
					})
			})
			.catch((err) => setError(err))
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		let emailValue = email
		let passwordValue = password
		//signup with firebase Auth
		setError('')
		setLoading(true)
		CreateNewSecondaryAdmin(emailValue, passwordValue).then(() => {
			setLoading(false)
			ProjectFireStore.collection('Admins')
				.doc(emailValue)
				.set({
					Name: emailValue,
					collegeName: currentCollege,
					adminType: 'secondaryAdmin',
				})
				.then(() => {
					setLoading(false)
					setError('')
				})
				.catch((err) => setError(err))
		})
		//save AdminEmail to each college
		ProjectFireStore.collection('Collage')
			.doc(currentCollege)
			.set({ ...currentData, AdminEmail: emailValue })
			.then(() => {
				setLoading(false)
				setError('')
				setToggle(false)
				console.log('addEmailValue')
			})
			.catch((err) => setError(err))
		setLoading(false)
	}

	useEffect(() => {
		//get the lost data to save them from getting lost &
		//set the email into email hook if it exists in dataBase
		ProjectFireStore.collection('Collage')
			.doc(currentCollege)
			.get()
			.then((res) => {
				setCurrentData(res.data())
				if (res?.data()['AdminEmail']) {
					setEmail(res.data()['AdminEmail'])
					setToggle(false)
				} else {
					setToggle(true)
					setEmail('')
					setPassword('')
				}
			})
			.catch((err) => {
				console.log(err)
			})
		ProjectFireStore.collection('Config')
			.doc('NSeatTotal')
			.get()
			.then((res) => {
				if (res.data()['Number']) {
					setTotalNumberOfSeats(res.data()['Number'])
				} else {
					setTotalNumberOfSeats(0)
				}
			})
		ProjectFireStore.collection('Collage')
			.doc(currentCollege)
			.get()
			.then((res) => {
				if (res.data()['seatsNumber']) {
					setDisable(true)
					setCurrentNumberOfSeats(res.data()['seatsNumber'])
				} else {
					setDisable(false)
				}
			})
			.catch((err) => {
				console.log(err)
			})
	}, [currentCollege, TotalNumberOfSeats])
	return (
		<div className='AddAdminForm'>
			<form onSubmit={(e) => handleSubmit(e)}>
				{loading && <Spinner />}
				{!toggle && (
					<ul className='Navigation-AdminEmail-Seats'>
						<li
							onClick={() => setActive(false)}
							className={!active && 'active'}
						>
							ADD ADMIN
						</li>
						<li onClick={() => setActive(true)} className={active && 'active'}>
							ADD SEATS
						</li>
					</ul>
				)}
				{!active ? (
					<div className='Add-admin-email'>
						<div className='icon'>
							<i className='fas fa-users-cog'></i>
						</div>
						<input
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							value={email}
							disabled={!toggle}
							required
						/>
						{/* tou can't edit if you have no email to edit! */}
						{!toggle && (
							<div
								className='custom-button btn'
								onClick={() =>
									email
										? setToggle(!toggle)
										: alert('please enter email and password')
								}
							>
								<i className='fas fa-edit'></i>
							</div>
						)}
					</div>
				) : (
					<>
						{!disable ? (
							<>
								<p className='totalNumberOfSeats'>
									Total number of seats : {TotalNumberOfSeats}
								</p>
								<div className='Add-admin-email'>
									<div className='icon'>
										<i className='fas fa-chair'></i>
									</div>
									<input
										type='number'
										min='1'
										max='6'
										value={SeatsfromInput}
										onChange={(e) => inputChange(e)}
									/>
								</div>
								<div className='submitAndCancel'>
									<button
										onClick={() => addSeats()}
										type='button'
										className='SubmitButton'
									>
										SAVE
									</button>
								</div>
							</>
						) : (
							<>
								<p style={{ color: 'white', textAlign: 'center' }}>
									the number of seats for this list : {currentNumberOfSeats}
								</p>
							</>
						)}
					</>
				)}
				{/* if you already have an account setup you dont need passwordinput nor buttons */}
				{toggle && (
					<>
						<div className='password-gen'>
							<div className='icon'>
								<i className='fas fa-key'></i>
							</div>
							<input
								onChange={(e) => {
									setPassword(e.target.value)
								}}
								type={show ? 'text' : 'password'}
								value={password}
								required
							/>
							<div className='custom-button btn' onClick={() => setShow(!show)}>
								<i className='fas fa-eye-slash'></i>
							</div>
						</div>
						<div className='submitAndCancel'>
							<button className='SubmitButton'> SAVE</button>
							<div
								onClick={() =>
									email
										? setToggle(false)
										: alert('Please enter Email and Password')
								}
								className='CancelButton btn'
							>
								{' '}
								CANCEL
							</div>
						</div>
					</>
				)}
				{error && <h1 style={{ margin: '10px', color: '#d62828' }}>{error}</h1>}
			</form>
		</div>
	)
}
export default AddAdminForm
