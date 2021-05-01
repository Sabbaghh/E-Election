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
	const [loading, setLoading] = useState(true)
	const [Manifiests, setManifiests] = useState('')
	const [currentCollegeName, setCurrentCollegeName] = useState('')
	const [currentManifest, setcurrentManifest] = useState('')
	const [candidates, setCandidates] = useState('')
	const contextValues = { candidates, currentManifest }
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
						candidates={candidates}
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
		setCandidates('')
		//get all candidates from this manifiest
		try {
			ProjectFireStore.collection('Collage')
				.doc(currentCollegeName)
				.collection('Manifiest')
				.doc(Manifiest)
				.collection('Candidates')
				.onSnapshot((res) => {
					let data = []
					res.docs.forEach((el) => {
						data.push(el.data())
					})
					if (data.length > 0) {
						setCandidates(data)
					}
				})
		} catch {
			alert(`something went wrong`)
			setCandidates('')
		}
	}
	const addNewManifiest = (e, ManifiestName) => {
		e.preventDefault()
		setLoading(true)
		console.log('addNewManifiest', ManifiestName)
		ProjectFireStore.collection('Collage')
			.doc(currentCollegeName)
			.collection('Manifiest')
			.doc(ManifiestName)
			.set({
				Name: ManifiestName,
			})
			.then(() => {
				setLoading(false)
				renderCurrentPage('')
				console.log('added')
			})
			.catch((err) => alert(`something went wrong!`))
	}
	const addNewCandidate = (
		e,
		Name,
		ID,
		Letter,
		currentManifest,
		setNewCandidateBackDrop,
	) => {
		e.preventDefault()
		setLoading(true)
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
				.then(() => {
					setNewCandidateBackDrop(false)
					setLoading(false)
				})
		} catch {
			alert(`something went wrong with`)
		}
	}
	const changeCandidateName = (
		CandidateName,
		currentCandidateData,
		currentManifest,
		setToggleBackDrop,
	) => {
		if (CandidateName === currentCandidateData.Name) {
			alert(`${CandidateName} is the same as ${currentCandidateData.Name}`)
		} else {
			ProjectFireStore.collection('Collage')
				.doc(currentCollegeName)
				.collection('Manifiest')
				.doc(currentManifest)
				.collection('Candidates')
				.doc(currentCandidateData.ID)
				.set({ ...currentCandidateData, Name: CandidateName })
				.then(() => {
					alert('Name is updated')
					setToggleBackDrop(false)
				})
				.catch(() => {
					alert(`somehting went wrong`)
				})
		}
	}
	const changeCandidateLetter = (
		CandidateLetter,
		currentCandidateData,
		currentManifest,
		setToggleBackDrop,
	) => {
		if (CandidateLetter === currentCandidateData.Letter) {
			alert(`${CandidateLetter} is the same as ${currentCandidateData.Letter}`)
		} else {
			ProjectFireStore.collection('Collage')
				.doc(currentCollegeName)
				.collection('Manifiest')
				.doc(currentManifest)
				.collection('Candidates')
				.doc(currentCandidateData.ID)
				.set({ ...currentCandidateData, Letter: CandidateLetter })
				.then(() => {
					alert('Letter is updated')
					setToggleBackDrop(false)
				})
				.catch(() => {
					alert(`somehting went wrong`)
				})
		}
	}
	const deleteCandidate = (currentCandidateData, currentManifest) => {
		ProjectFireStore.collection('Collage')
			.doc(currentCollegeName)
			.collection('Manifiest')
			.doc(currentManifest)
			.collection('Candidates')
			.doc(currentCandidateData.ID)
			.delete()
			.then(() => {
				alert('Candidate is deleted')
			})
			.catch(() => {
				alert(`somehting went wrong`)
			})
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
	}, [currentUser, currentManifest])
	return (
		<div className='SecondaryAdmin'>
			{loading && <BackDropSpinner />}
			<NavBar
				Manifiests={Manifiests}
				renderCurrentPage={renderCurrentPage}
				logOut={logOut}
				onManifiestClick={onManifiestClick}
				currentCollegeName={currentCollegeName}
			/>
			<Context.Provider value={contextValues}>
				<WorkSpace>{currentPage}</WorkSpace>
			</Context.Provider>

			{/* <BackDropSpinner /> */}
		</div>
	)
}

export default SecondDashboard
