import logo from '@/assets/Gss-logo-blue.svg'
import { sidebarClientLinks } from '@/constants'
import { Link, useLocation } from 'react-router-dom'

const SidebarClient = () => {
	const location = useLocation()

	return (
		<div className='w-10 md:w-[200px] col-span-2 fixed	 left-0 top-0 bg-white'>
			<div className='h-screen border-r border-slate-400 py-4 flex flex-col gap-y-10'>
				{/* Logo */}
				<div className='mx-auto'>
					<Link to={'/'}>
						<h1 className='md:hidden flex text-blue-700 font-bold mt-10'>
							GSS
						</h1>
						<img
							src={logo}
							alt='Logo'
							className='w-38 hidden lg:flex md:flex'
						/>
					</Link>
				</div>
				{/* Logo */}

				{/* Navigation Links */}
				<ul className='h-2/4 w-full mt-2 space-y-7 flex flex-col'>
					{sidebarClientLinks.map((link, index) => (
						<Link
							to={link.path}
							key={index}
							className={`font-bold py-5 px-5 ${
								location.pathname === link.path ? 'bg-blue-800 text-white' : ''
							}`}
						>
							<li
								className={
									'flex items-center justify-center md:justify-start md:gap-5'
								}
							>
								<span className=' text-[20px]'>
									<link.icon />
								</span>
								<span className='text-sm hidden md:flex'>{link.name}</span>
							</li>
						</Link>
					))}
				</ul>

				{/* Navigation Links */}

				<div className='w-full md:px-2 py-5 absolute left-0 bottom-0  cursor-pointer text-center'>
					<p className='flex justify-center text-md text-white md:py-2 md:px-5 p-2 bg-blue-700  rounded-full'>
						<span className='md:hidden flex'>?</span>
						<span className='hidden md:flex'>문의 ?</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export default SidebarClient
