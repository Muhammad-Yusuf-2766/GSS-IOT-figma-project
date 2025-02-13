import SidebarAdmin from '@/components/shared/sideBar.admin'
import SidebarClient from '@/components/shared/sideBar.client'
import UnauthorizedPage from '@/components/shared/unauthorizedPage'
import { useUserState } from '@/stores/user.auth.store'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
	const { user } = useUserState()

	return (
		<div className='w-full h-full flex justify-center'>
			{!user ? (
				<UnauthorizedPage />
			) : (
				<>
					{/* Admin type user dashboard layout */}
					{user && user.user_type === 'ADMIN' && (
						<>
							<div className='h-screen md:w-52 w-10'>
								<SidebarAdmin />
							</div>
							<div className='w-full h-screen  flex justify-center items-center px-3'>
								<Outlet />
							</div>
						</>
					)}

					{/* Client type user dashboard layout */}
					{user && user.user_type === 'CLIENT' && (
						<>
							<div className='h-screen md:w-52 w-10'>
								<SidebarClient />
							</div>
							<div className='w-full h-screen  flex justify-center items-center px-3'>
								<Outlet />
							</div>
						</>
					)}
				</>
			)}
		</div>
	)
}

export const ClientLayout = () => {
	const { user } = useUserState()

	return (
		<div className='w-full h-full flex justify-center'>
			{!user ? (
				<UnauthorizedPage />
			) : (
				<>
					{/* Client type user dashboard layout */}
					<div className='h-screen md:w-52 w-10'>
						<SidebarClient />
					</div>
					<div className='w-full h-screen  flex justify-center items-center px-3'>
						<Outlet />
					</div>
				</>
			)}
		</div>
	)
}
