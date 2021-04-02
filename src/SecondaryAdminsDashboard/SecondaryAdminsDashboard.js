import React, { useState } from 'react'
import NavBar from './NavBar'
import WorkSpace from './WorkSpace'
import AddNewList from './AddNewList'
import CandidatesPage from './CandidatesPage'
import DefualtPage from './DefualtPage'

import './styles/SecondaryAdmin.scss'

const SecondDashboard = () => {
	const [currentPage, setCurrentPage] = useState(<DefualtPage />)
	const renderCurrentPage = (currentPage) => {
		switch (currentPage) {
			case 'AddNewList':
				setCurrentPage(<AddNewList />)
				break
			case 'CandidatesPage':
				setCurrentPage(<CandidatesPage />)
				break
			default:
				setCurrentPage(<DefualtPage />)
				break
		}
	}
	return (
		<div className='SecondaryAdmin'>
			<NavBar renderCurrentPage={renderCurrentPage} />
			<WorkSpace>{currentPage}</WorkSpace>
		</div>
	)
}

export default SecondDashboard
