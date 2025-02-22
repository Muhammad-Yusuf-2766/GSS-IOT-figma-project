import GssLogo from '@/assets/GSS-logo.svg'
import { navLinks } from '@/constants'
import { useUserState } from '@/stores/user.auth.store'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
	const { user } = useUserState()
	const dashboardPath =
		user?.user_type === 'ADMIN'
			? '/admin/dashboard'
			: user?.user_type === 'CLIENT'
			? '/client/dashboard'
			: '/unauthorized'
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

	return (
		<nav className='w-full h-[10vh] inset-0 z-50 bg-transparent'>
			<div className='w-full mx-auto h-full flex justify-between items-center px-4'>
				<Link className='md:w-fit w-[70px]' to='/'>
					<img src={GssLogo} alt='Logo' className='' />
				</Link>

				{/* Desktop Menu */}
				<div className='hidden md:flex w-2/3 items-center justify-between'>
					{navLinks.map(nav => (
						<NavLink
							key={nav.path}
							to={nav.path}
							className={({ isActive }) =>
								`font-bold text-xl hover:underline underline-offset-8 decoration-[2px] ${
									isActive
										? 'underline underline-offset-4 decoration-[2px]'
										: ''
								}`
							}
						>
							{nav.label}
						</NavLink>
					))}
					<NavLink
						className={({ isActive }) =>
							`font-bold text-xl hover:underline underline-offset-8 decoration-[2px] ${
								isActive ? 'underline underline-offset-4 decoration-[2px]' : ''
							}`
						}
						to={dashboardPath}
					>
						대시보드
					</NavLink>
				</div>

				{/* Mobile Menu Button */}
				<button className='md:hidden' onClick={toggleMenu}>
					<Menu className='h-6 w-6' />
				</button>

				{/* Mobile Side Menu */}
				<div
					className={`fixed top-0 right-0 h-full w-2/4 bg-blue-950 shadow-lg transform transition-transform duration-300 ease-in-out ${
						isMenuOpen ? 'translate-x-0' : 'translate-x-full'
					} md:hidden`}
				>
					<div className='flex flex-col h-full p-4'>
						<button onClick={toggleMenu} className='self-end mb-8'>
							<X className='h-6 w-6' />
						</button>
						{navLinks.map(nav => (
							<NavLink
								key={nav.path}
								to={nav.path}
								className={({ isActive }) =>
									`font-bold text-xl py-2 hover:underline underline-offset-8 ${
										isActive ? 'underline underline-offset-4' : ''
									}`
								}
								onClick={toggleMenu}
							>
								{nav.label}
							</NavLink>
						))}
						<NavLink
							className={({ isActive }) =>
								`font-bold text-xl py-2 hover:underline underline-offset-8 ${
									isActive ? 'underline underline-offset-4' : ''
								}`
							}
							to={dashboardPath}
						>
							대시보드
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
