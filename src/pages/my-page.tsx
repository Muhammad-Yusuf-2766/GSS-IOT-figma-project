import serviceSafety from '@/assets/service_safety.jpg'
import { useUserState } from '@/stores/user.auth.store'

const MyPage = () => {
	const { user } = useUserState()

	return (
		<div
			className='h-screen w-full flex justify-center items-center text-3xl py-10 md:px-16 relative bg-cover bg-center bg-no-repeat'
			style={{ backgroundImage: `url(${serviceSafety})` }}
		>
			{/* Qora overlay */}
			<div className='absolute inset-0 bg-black/45' />

			{/* Asosiy content */}
			<div className='relative flex flex-col md:flex-row gap-10 justify-center items-center w-full h-full border-8 border-white p-6 md:p-10 text-white rounded-[40px]'>
				{/* Foydalanuvchi ma'lumotlari */}
				<ul className='md:w-fit max-h-[200px] w-full p-8 bg-gray-600/40 backdrop-blur-md rounded-2xl md:text-lg text-sm space-y-2 border border-white'>
					<li>이름: {user?.user_name}</li>
					<li>이메일: {user?.user_email}</li>
					<li>연락처: {user?.user_phone}</li>
					<li>유형: {user?.user_type}</li>
				</ul>

				{/* Ma'lumot bloki */}
				<div className='md:w-fit md:min-h-[200px] w-full p-8 border border-white bg-gray-600/40 backdrop-blur-md rounded-2xl md:text-lg text-sm md:mt-0'>
					<h1>마이 페이지입니다.</h1>
					<p className='mt-5'>이 페이지가 개발중입니다.</p>
				</div>
			</div>
		</div>
	)
}

export default MyPage
