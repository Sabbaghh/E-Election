import React, { useContext } from 'react'
import { DashboardContext } from '../MainAdminDashboard/MainAdminDashBoard'
import { AuthContext } from '../Contexts/AuthContext'

const ProfileSetting = () => {
	const { setCurrentCollege } = useContext(DashboardContext)
	const logout = useContext(AuthContext).logout
	return (
		<div className='setting-conatiner AnyItem-container'>
			<div onClick={() => logout()}>
				<i className='fas fa-sign-out-alt'></i>
			</div>
			<div onClick={() => setCurrentCollege('config')}>
				<i className='fas fa-cog'></i>
			</div>
		</div>
	)
}

export default ProfileSetting
