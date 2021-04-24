import React, { useState, useEffect, useContext, createContext } from 'react'
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
export const Context = createContext()
const SecondDashboard = () => {
	const currentUser = useContext(AuthContext).currentUser
	const [currentPage, setCurrentPage] = useState(<DefualtPage />)
	const [loading, setLoading] = useState(false)
	const [Manifiests, setManifiests] = useState('')
	const [currentCollegeName, setCurrentCollegeName] = useState('')
	const [currentManifest, setcurrentManifest] = useState('')
	const [closeAddCandidateBackDrop, setCloseAddCandidateBackDrop] = useState(
		true,
	)
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
						currentManifest={currentManifest}
						closeAddCandidateBackDrop={closeAddCandidateBackDrop}
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
	const onManifiestClick = (Manifiest) => {
		setcurrentManifest(Manifiest)
	}
	const addNewManifiest = (e, ManifiestName) => {
		e.preventDefault()
		console.log('addNewManifiest', ManifiestName)
		ProjectFireStore.collection('Collage')
			.doc(currentCollegeName)
			.collection('Manifiest')
			.doc(ManifiestName)
			.set({
				Name: ManifiestName,
			})
			.catch((err) => console.log(err))
	}
	const addNewCandidate = (e, Name, ID, Letter, currentManifest) => {
		e.preventDefault()
		try {
			ProjectFireStore.collection('Collage')
				.doc(currentCollegeName)
				.collection('Manifiest')
				.doc(currentManifest)
				.collection('Candidates')
				.doc(ID)
				.set({
					Name,
					ID,
					Letter,
				})
		} catch {
			alert(`something went wrong with ${currentManifest} `, currentManifest)
		}
	}
	const changeCandidateName = (CandidateName, currentCandidateDataName) => {
		// console.log('changeCandidateName', CandidateName, currentCandidateDataName)
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
		try {
			ProjectFireStore.collection('Collage')
				.doc(collegeName)
				.collection('Manifiest')
				.onSnapshot((res) => {
					let data = []
					res.docs.forEach((el) => {
						data.push(el.id)
					})
					if (data.length > 0) {
						setManifiests(data)
					} else {
						setManifiests('')
					}
				})
		} catch {
			setManifiests('')
		}
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
		console.log(currentManifest)
	}, [currentUser, currentManifest])
	return (
		<div className='SecondaryAdmin'>
			{loading && <BackDropSpinner />}
			<NavBar
				Manifiests={Manifiests}
				renderCurrentPage={renderCurrentPage}
				logOut={logOut}
				onManifiestClick={onManifiestClick}
			/>
			<Context.Provider value={currentManifest}>
				<WorkSpace>{currentPage}</WorkSpace>
			</Context.Provider>

			{/* <BackDropSpinner /> */}
		</div>
	)
}

export default SecondDashboard
