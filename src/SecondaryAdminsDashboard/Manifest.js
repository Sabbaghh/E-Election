import React from 'react'
import Logo from '../assests/logo/e-election-logo.png'

const Manifest = ({ renderCurrentPage, Manifiests, onManifiestClick }) => {
	return (
		<>
			{Manifiests ? (
				<>
					{Manifiests.map((man) => {
						return (
							<div
								key={man}
								className='manifest'
								onClick={() => {
									renderCurrentPage('CandidatesPage')
									onManifiestClick(man)
								}}
							>
								<div className='logoContainer'>
									<img src={Logo} alt='Logo' />
								</div>
								<span>{man}</span>
							</div>
						)
					})}
				</>
			) : (
				<p className='NoManifiest'>No Manifiests for now</p>
			)}
		</>
	)
}

export default Manifest
