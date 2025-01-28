const UnauthorizedPage = () => {
	return (
		<div
			className='h-screen w-full flex justify-center items-center text-3xl py-10 md:px-16 relative z-10'
			style={{
				backgroundImage: "url('/src/assets/service_safety.jpg')",
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className='w-full h-full absolute top-0 left-0 -z-10 bg-black/45' />
			<div
				className='w-full h-full flex justify-around items-center border-[9px] border-white py-6 md:px-10 px-5 text-white'
				style={{ borderRadius: '40px' }}
			>
				<h1>Unauthorized user. Please login as Clinet user</h1>
			</div>
		</div>
	)
}

export default UnauthorizedPage
