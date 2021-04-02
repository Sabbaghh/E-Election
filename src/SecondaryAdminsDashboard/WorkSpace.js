import React from 'react'
import Container from '@material-ui/core/Container'
import './styles/workSpace.scss'

const WorkSpace = ({ children }) => {
	return <Container className='workSpace'>{children}</Container>
}

export default WorkSpace
