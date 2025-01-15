// === Icons === //
import { headButtons } from '@/constants'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	const [user, setUser] = useState(true)

	// Handle logout
	//.......

	return (
		<div className='w-full h-auto md:flex grid grid-cols-2 justify-between items-center px-4 py-2 border-slate-400 border-b'>
			{user && (
				<div>
					<h1 className='md:text-2xl  font-bold text-gray-700'>환영합니다!</h1>
					<p className='md:text-md font-semibold text-gray-700'>
						GSS-GROUP 매니저{' '}
						<span className='md:text-xl font-bold text-blue-700'>
							{' '}
							Yang da yeoun
						</span>
					</p>
				</div>
			)}

			<div className='flex items-center space-x-5'>
				<div className='flex'>
					{headButtons.map(({ id, icon: Icon, route }) => (
						<Link
							to={`http://localhost:5173/admin/dashboard/${route}`}
							key={id}
						>
							<div className='hover:bg-gray-200 p-2 rounded md:text-[35px] text-[25px] text-blue-700'>
								<Icon />
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default Header
