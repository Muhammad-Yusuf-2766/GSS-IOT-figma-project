import { useUserState } from '@/stores/user.auth.store'
import { IResource } from '@/types/interfaces'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import UserBox from './userBox'

interface PageNavProps {
	data: IResource // `data` ni to'g'ri aniqlash
}

const PagesNavbar: React.FC<PageNavProps> = ({ data }) => {
	const { user } = useUserState()
	const { img, title } = data
	return (
		<>
			<div
				className='w-full h-screen flex flex-col py-10 md:px-16 relative z-10 text-secondary'
				style={{
					backgroundImage: `url("${img}")`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='w-full h-full bg-black/45 absolute top-0 left-0 -z-10' />
				{/* Authentication part */}
				<div className='w-full h-auto flex justify-end mb-2'>
					{user ? (
						<div className=' w-fit h-fit flex items-center mr-10 gap-3'>
							<UserBox />
						</div>
					) : (
						<div className=' w-fit h-fit flex items-center mr-10 gap-3'>
							<Link
								to={'/auth'}
								className='hover:underline underline-offset-2 '
							>
								Login
							</Link>
							<div className='w-[2px] h-3 bg-white' />
							<Link
								to={'/auth'}
								className='hover:underline underline-offset-2 '
							>
								Sign in
							</Link>
						</div>
					)}
				</div>

				{/* Main contnet */}
				<div
					className='w-full h-full flex flex-col gap-y-16 border-[9px] border-white pt-6 px-10'
					style={{ borderRadius: 40 }}
				>
					<Navbar />
					<div className='w-full h-3/5 flex justify-center'>
						<div className='w-2/3 h-full flex items-center justify-between'>
							<h1 className='text-6xl font-outfit font-semibold'>{title}</h1>
							<div className='w-2/3 h-[3px] bg-secondary' />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PagesNavbar
