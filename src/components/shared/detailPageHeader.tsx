import { navLinks } from '@/constants'
import { useUserState } from '@/stores/user.auth.store'
import { Link, NavLink } from 'react-router-dom'
import UserBoxBlack from './userBoxBlack'

const DetailPageHeader = () => {
	const { user } = useUserState()

	return (
		<header className='border-b'>
			<div className='max-w-[1320px] mx-auto px-4 py-4'>
				<div className='flex items-center justify-between'>
					{/* Logo */}
					<Link to='/' className='flex items-center text-gray-900'>
						<img src='/src/assets//gsslogo-black-figma.svg' alt='' />
					</Link>
					<div className='flex items-center gap-12'>
						{/* Navigation */}
						<nav className='hidden md:flex items-center gap-8'>
							{navLinks.map(link => (
								<NavLink
									to={link.path}
									className={({ isActive }) =>
										`font-semibold hover:underline underline-offset-4 decoration-[2px] ${
											isActive
												? 'underline underline-offset-4 decoration-[2px]'
												: ''
										}`
									}
								>
									{link.label}
								</NavLink>
							))}
						</nav>
					</div>
					{/* Auth */}
					{user ? (
						<UserBoxBlack />
					) : (
						<div className='flex items-center gap-4 text-sm'>
							<Link to='/login' className='hover:text-gray-600'>
								Log In
							</Link>
							<span>|</span>
							<Link to='/profile' className='hover:text-gray-600'>
								My Profile
							</Link>
						</div>
					)}
					{/* Auth */}
				</div>
			</div>
		</header>
	)
}

export default DetailPageHeader
