import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import Logo from '../assests/logo/e-election-logo.png'

const AddNewCandidate = ({
	setNewCandidateBackDrop,
	addNewCandidate,
	currentManifest,
}) => {
	const [Name, setName] = useState('')
	const [NameControl, setNameControl] = useState(false)
	const [ID, setID] = useState('')
	const [IDControl, setIDControl] = useState(false)
	const [Letter, setLetter] = useState('')
	return (
		<form
			class='AddNewCandidateForm'
			onSubmit={(e) => addNewCandidate(e, Name, ID, Letter, currentManifest)}
		>
			<span>{currentManifest}</span>
			<div className='LogoContainer'>
				<img src={Logo} alt='logo' />
			</div>
			<TextField
				type='text'
				variant='outlined'
				label='name'
				required
				color={NameControl ? 'primary' : 'secondary'}
				value={Name}
				onChange={(e) => {
					setName(e.target.value)
					setNameControl(true)
					e.target.value.length > 2
						? setNameControl(true)
						: setNameControl(false)
				}}
				placeholder='Abdallah sabbagh'
			/>
			<TextField
				type='text'
				variant='outlined'
				label='ID'
				required
				color={IDControl ? 'primary' : 'secondary'}
				value={ID}
				onChange={(e) => {
					setID(e.target.value)
					setIDControl(true)
					e.target.value.length > 6 ? setIDControl(true) : setIDControl(false)
				}}
				placeholder='1831690'
			/>
			<TextField
				type='text'
				variant='outlined'
				multiline
				rows={2}
				label='Letter'
				color='primary'
				value={Letter}
				onChange={(e) => {
					setLetter(e.target.value)
				}}
				placeholder='Vote for me'
			/>
			<div>
				<Button
					variant='contained'
					color='primary'
					type='submit'
					size='large'
					disabled={!(NameControl && IDControl)}
				>
					submit
				</Button>
				<Button
					variant='contained'
					color='primary'
					type='button'
					size='large'
					onClick={() => setNewCandidateBackDrop(false)}
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}

export default AddNewCandidate
