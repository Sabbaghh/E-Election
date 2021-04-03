import React, { useState, useEffect, useContext } from 'react'
import { ProjectFireStore } from '../FireBase/fireBase'
import { SecondaryAdmins } from '../FireBase/SecondaryAdminAuth'
import { AuthContext } from '../Contexts/AuthContext'
import NavBar from './NavBar'
import WorkSpace from './WorkSpace'
import AddNewList from './AddNewList'
import CandidatesPage from './CandidatesPage'
import DefualtPage from './DefualtPage'
import BackDropSpinner from '../Shared/BackdropSpinner'
import './styles/SecondaryAdmin.scss'
const SecondDashboard = () => {
	const currentUser = useContext(AuthContext).currentUser
	const [currentPage, setCurrentPage] = useState(<DefualtPage />)
	const [loading, setLoading] = useState(false)
	const [Manifiests, setManifiests] = useState([])
	const [currentCollegeName, setCurrentCollegeName] = useState('')
	const renderCurrentPage = (currentPage) => {
		switch (currentPage) {
			case 'AddNewList':
				setCurrentPage(<AddNewList addNewManifiest={addNewManifiest} />)
				break
			case 'CandidatesPage':
				setCurrentPage(
					<CandidatesPage
						addNewCandidate={addNewCandidate}
						changeCandidateName={changeCandidateName}
						changeCandidateLetter={changeCandidateLetter}
						deleteCandidate={deleteCandidate}
					/>,
				)
				break
			default:
				setCurrentPage(<DefualtPage />)
				break
		}
	}
	const logOut = () => {
		return SecondaryAdmins.signOut()
	}
	const addNewManifiest = (e, ManifiestName) => {
		e.preventDefault()
		console.log('addNewManifiest', ManifiestName)
	}
	const addNewCandidate = (e) => {
		e.preventDefault()
		console.log('addNewCandidate')
	}
	const changeCandidateName = (CandidateName, currentCandidateDataName) => {
		console.log('changeCandidateName', CandidateName, currentCandidateDataName)
	}
	const changeCandidateLetter = (
		CandidateLetter,
		currentCandidateDataLetter,
	) => {
		console.log(
			'changeCandidateLetter',
			CandidateLetter,
			currentCandidateDataLetter,
		)
	}
	const deleteCandidate = () => {
		console.log('deleteCandidate')
	}
	const getManifiest = (collegeName) => {
		ProjectFireStore.collection('Collage')
			.doc('HU')
			.collection('Manifest')
			.get()
			.then((res) => {
				res.docs.forEach((el) => {
					console.log(el.id)
				})
			})
	}

	useEffect(() => {
		setLoading(true)
		//get the collegeName from admins document
		ProjectFireStore.collection('Admins')
			.doc(currentUser.email)
			.get()
			.then((data) => {
				setCurrentCollegeName(data.data().collegeName)
				setLoading(false)
				getManifiest(data.data().collegeName)
			})
			.catch((err) => {
				console.log(err)
			})
		//get all manifiests
	}, [currentUser])
	return (
		<div className='SecondaryAdmin'>
			{loading && <BackDropSpinner />}
			<NavBar renderCurrentPage={renderCurrentPage} logOut={logOut} />
			<WorkSpace>{currentPage}</WorkSpace>
			{/* <BackDropSpinner /> */}
		</div>
	)
}

export default SecondDashboard
