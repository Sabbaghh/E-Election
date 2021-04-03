import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Logo from '../assests/logo/e-election-logo.png'

const AddNewList = ({ addNewManifiest }) => {
	const [ManifiestName, setManifiestName] = useState('')
	const [ManifiestControl, setManifiestControl] = useState(true)
	return (
		<form
			className='AddNewList'
			onSubmit={(e) => addNewManifiest(e, ManifiestName)}
		>
			<div className='logoContainer'>
				<img src={Logo} alt='logo' />
			</div>
			<h1>ADD NEW LIST</h1>
			<TextField
				type='text'
				variant='standard'
				label='LIST'
				color={!ManifiestControl ? 'primary' : 'secondary'}
				className='input'
				placeholder='List Name'
				value={ManifiestName}
				onChange={(e) => {
					setManifiestName(e.target.value)
					e.target.value.length > 2
						? setManifiestControl(false)
						: setManifiestControl(true)
				}}
			/>
			<Button
				color='primary'
				size='large'
				type='submit'
				startIcon={<AddIcon />}
				variant='contained'
				className='input'
				disabled={ManifiestControl}
			>
				ADD NEW LIST
			</Button>
		</form>
	)
}

export default AddNewList
