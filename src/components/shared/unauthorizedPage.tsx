import serviceSafety from '@/assets/service_safety.jpg'
import Navbar from './navbar'

const UnauthorizedPage = () => {
	return (
		<div
			className='h-screen w-full flex justify-center items-center text-3xl py-10 md:px-16 relative z-10'
			style={{
				backgroundImage: `url(${serviceSafety})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className='w-full h-full absolute top-0 left-0 -z-10 bg-black/45' />

			<div
				className='w-full h-full flex flex-col border-[9px] border-white py-6 md:px-10 px-5 text-white'
				style={{ borderRadius: '40px' }}
			>
				{/* Navbar tepada qoladi */}
				<Navbar />

				{/* H1 ni markazga joylashtirish uchun flex-grow ishlatamiz */}
				<div className='flex-1 flex justify-center items-center'>
					<h1>Unauthorized user. Please login as Client user</h1>
				</div>
			</div>
		</div>
	)
}

export default UnauthorizedPage
