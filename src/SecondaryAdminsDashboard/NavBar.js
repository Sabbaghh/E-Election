import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Logo from '../assests/logo/e-election-logo.png'
import './styles/NavBar.scss'

const NavBar = () => (
	<Grid className='navbar2' container direction='row' justify='center'>
		<Container className='sm-nav'>
			<div className='logoContainer'>
				<img src={Logo} alt='logo' />
			</div>
		</Container>
		<Container className='lg-nav'>
			<div className='portalName'>
				<span>HU ADMIN PORTAL</span>
			</div>
		</Container>
	</Grid>
)

export default NavBar
