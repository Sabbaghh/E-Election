import React from 'react'
import Logo from '../assests/logo/e-election-logo.png'

const Manifest = ({ renderCurrentPage }) => {
	return (
		<>
			<div
				className='manifest'
				onClick={() => renderCurrentPage('CandidatesPage')}
			>
				<div className='logoContainer'>
					<img src={Logo} alt='Logo' />
				</div>
				<span>List1</span>
			</div>
			<div className='manifest'>
				<div className='logoContainer'>
					<img src={Logo} alt='Logo' />
				</div>
				<span>List1</span>
			</div>
		</>
	)
}

export default Manifest
