import SidebarAdmin from '@/components/shared/sideBar.admin'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<div className='w-full h-full flex justify-center'>
			{/* Sidebar bo'limi */}
			<div className='h-screen md:w-52 w-10'>
				<SidebarAdmin />
			</div>

			{/* Outlet joylashgan asosiy bo'lim */}
			<div className='w-full h-screen  flex justify-center items-center px-3'>
				{/* flex-1 asosiy bo'limni to'ldiradi */}
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
