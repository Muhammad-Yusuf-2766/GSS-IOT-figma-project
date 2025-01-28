import SidebarAdmin from '@/components/shared/sideBar.admin'
import UnauthorizedPage from '@/components/shared/unauthorizedPage'
import { useUserState } from '@/stores/user.auth.store'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	const { user } = useUserState()

	return (
		<div className='w-full h-full flex justify-center'>
			{!user ? (
				<UnauthorizedPage />
			) : (
				<>
					<div className='h-screen md:w-52 w-10'>
						<SidebarAdmin />
					</div>
					<div className='w-full h-screen  flex justify-center items-center px-3'>
						{/* flex-1 asosiy bo'limni to'ldiradi */}
						<Outlet />
					</div>
				</>
			)}
		</div>
	)
}

export default Layout
