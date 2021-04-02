import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import './styles/CandidatesPage.scss'
const imgdemo = 'https://www.w3schools.com/howto/img_avatar.png'
const qrCodeDemo =
	'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'

const CandidatesPage = () => {
	const useStyles = makeStyles({
		root: {
			maxWidth: 345,
			margin: 15,
		},
	})
	const classes = useStyles()
	const studentsDemo = [
		{
			Image: imgdemo,
			Name: 'studentDemo',
			Late: 'Vote For Me',
			QRcode: qrCodeDemo,
		},
		{
			Image: imgdemo,
			Name: 'studentDemo',
			Late: 'Vote For Me',
			QRcode: qrCodeDemo,
		},
		{
			Image: imgdemo,
			Name: 'studentDemo',
			Late: 'Vote For Me',
			QRcode: qrCodeDemo,
		},
		{
			Image: imgdemo,
			Name: 'studentDemo',
			Late: 'Vote For Me',
			QRcode: qrCodeDemo,
		},
		{
			Image: imgdemo,
			Name: 'studentDemo',
			Late: 'Vote For Me',
			QRcode: qrCodeDemo,
		},
		{
			Image: imgdemo,
			Name: 'studentDemo',
			Late: 'Vote For Me',
			QRcode: qrCodeDemo,
		},
	]
	return (
		<>
			<Button variant='contained' size='small' color='primary'>
				Add New candidate
			</Button>
			<Grid
				container
				direction='row'
				justify='space-between"'
				alignItems='center'
				className='CandidatesPage'
			>
				{studentsDemo.map((candidate) => {
					return (
						<Card className={classes.root}>
							<CardActionArea>
								<CardMedia
									component='img'
									alt='Contemplative Reptile'
									height='200'
									image={candidate.Image ? candidate.Image : imgdemo}
									title='Contemplative Reptile'
								/>
								<CardContent>
									<Typography gutterBottom variant='h5' component='h2'>
										{candidate.Name}
									</Typography>
									<Typography
										variant='body2'
										color='textSecondary'
										component='p'
									>
										{candidate.Late}
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Button size='small' color='primary'>
									edit
								</Button>
								<Button size='small' color='primary'>
									Learn More
								</Button>
							</CardActions>
						</Card>
					)
				})}
			</Grid>
		</>
	)
}

export default CandidatesPage
