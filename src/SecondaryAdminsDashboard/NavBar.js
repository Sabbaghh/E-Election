import React from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Manifest from './Manifest'
import AddIcon from '@material-ui/icons/Add'
import Logo from '../assests/logo/e-election-logo.png'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import './styles/NavBar.scss'

const NavBar = ({
	renderCurrentPage,
	logOut,
	Manifiests,
	onManifiestClick,
}) => (
	<Grid className='navbar2' container direction='row' justify='center'>
		<Container className='sm-nav'>
			<div className='logoContainer'>
				<img src={Logo} alt='logo' onClick={() => renderCurrentPage('')} />
			</div>
			<div>
				<Button
					endIcon={<AddIcon />}
					variant='outlined'
					size='large'
					type='button'
					onClick={() => renderCurrentPage('AddNewList')}
				>
					Add new Manifiest
				</Button>
			</div>
			<div style={{ marginBottom: '1rem' }}>
				<Button
					endIcon={<ExitToAppIcon />}
					variant='outlined'
					size='large'
					type='button'
					onClick={() => logOut()}
				>
					Log out
				</Button>
			</div>
		</Container>
		<Container className='lg-nav'>
			<div className='portalName'>
				<span>HU ADMIN PORTAL</span>
			</div>
			<Container className='manifestContainer'>
				<Manifest
					Manifiests={Manifiests}
					renderCurrentPage={renderCurrentPage}
					onManifiestClick={onManifiestClick}
				/>
			</Container>
		</Container>
	</Grid>
)

export default NavBar
