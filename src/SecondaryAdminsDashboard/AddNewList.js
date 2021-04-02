import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Logo from '../assests/logo/e-election-logo.png'

const AddNewList = () => {
	return (
		<form className='AddNewList'>
			<div className='logoContainer'>
				<img src={Logo} alt='logo' />
			</div>
			<h1>ADD NEW LIST</h1>
			<TextField
				type='text'
				variant='standard'
				label='LIST'
				color='primary'
				className='input'
				placeholder='List Name'
			/>
			<Button
				color='primary'
				size='large'
				type='submit'
				startIcon={<AddIcon />}
				variant='contained'
				className='input'
			>
				ADD NEW LIST
			</Button>
		</form>
	)
}

export default AddNewList
