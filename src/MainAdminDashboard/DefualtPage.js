import React from 'react'
import './css/defuatPage.css'
import Logo from '../assests/logo/e-election-logo.png'
import LogoElemnt from '../Shared/logoElement'

const DefualtPage = () => {
	return (
		<div className='DefualtPage'>
			<LogoElemnt width='20rem' height='20rem' src={Logo} />
		</div>
	)
}

export default DefualtPage
