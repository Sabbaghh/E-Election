import React from 'react'
import Container from '@material-ui/core/Container'
import AddNewList from './AddNewList'
import './styles/workSpace.scss'

const WorkSpace = () => {
	return (
		<Container className='workSpace'>
			<AddNewList />
		</Container>
	)
}

export default WorkSpace
