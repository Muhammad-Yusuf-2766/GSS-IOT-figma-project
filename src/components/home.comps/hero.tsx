import Navbar from '@/components/shared/navbar'
import { useAuthState } from '@/stores/auth.store'
import { useUserState } from '@/stores/user.auth.store'
import { ICarouselItem } from '@/types/interfaces'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserBox from '../shared/userBox'

const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const { setAuth } = useAuthState()
	const { user } = useUserState()

	const carouselData: ICarouselItem[] = [
		{
			backgroundImage: "url('/src/assets/service_safety.jpg')",
			title: 'e-Smart',
			subtitle: 'Safety',
			description:
				'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		},
		{
			backgroundImage: "url('/src/assets/services_farm.jpg')",
			title: 'e-Smart',
			subtitle: 'Farm',
			description:
				'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		},
		{
			backgroundImage: "url('/src/assets/GSS_Safety.jpg')",
			title: 'GSS-건설현장',
			subtitle: '안전관리시스템',
			description:
				'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		},
	]

	const handlePrev = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
		)
	}

	const handleNext = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
		)
	}

	const { backgroundImage, title, subtitle, description } =
		carouselData[currentIndex]
	return (
		<>
			<div
				className='w-full h-screen flex flex-col py-5 md:px-16 relative z-10 text-secondary'
				style={{
					backgroundImage: backgroundImage,
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
								onClick={() => setAuth('login')}
								className='hover:underline underline-offset-2 '
							>
								Login
							</Link>
							<div className='w-[2px] h-3 bg-white' />
							<Link
								to={'/auth'}
								onClick={() => setAuth('register')}
								className='hover:underline underline-offset-2 '
							>
								Sign in
							</Link>
						</div>
					)}
				</div>
				{/* Authentication part */}

				{/* Main contnet */}
				<div
					className='w-full h-full flex flex-col md:gap-y-16 gap-y-5 border-[9px] border-white py-6 px-10'
					style={{ borderRadius: '40px' }}
				>
					<Navbar />
					<div className='w-full h-full md:flex items-center justify-between'>
						{/* Left side */}
						<div className='md:w-[50%] md:h-full h-2/5 flex justify-start'>
							<div className='w-full md:h-[55%]  flex itmes-center justify-between'>
								<div className='w-[150px] flex flex-col justify-between'>
									<div className='text-lg'>
										<h1 className='font-semibold tracking-wide'>
											GSS-건설현장{' '}
										</h1>
										<span className='font-semibold tracking-wide'>
											안전관리시스템
										</span>
									</div>

									<div className='w-full h-auto pt-2 border-t-2 border-secondary'>
										<p className='text-sm text-gray-200'>
											IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고
											간편하게 제어하여 쾌적한 환경을 만들어줍니다.
										</p>
									</div>
								</div>

								<div className='w-[2px] h-full bg-secondary' />

								<div className='w-[150px] h- flex flex-col justify-between'>
									<div className='text-lg'>
										<h1 className='font-semibold tracking-wide'>e-Smart </h1>
										<span className='font-semibold tracking-wide'>Light</span>
									</div>

									<div className='w-full h-auto pt-2 border-t-2 border-secondary'>
										<p className='text-sm text-gray-200'>
											IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고
											간편하게 제어하여 쾌적한 환경을 만들어줍니다.
										</p>
									</div>
								</div>

								<div className='w-[2px] h-full bg-secondary' />

								<div className='w-[150px] h- flex flex-col justify-between'>
									<div className='text-lg'>
										<h1 className='font-semibold tracking-wide'>e-Smart</h1>
										<span className='font-semibold tracking-wide'>Farm</span>
									</div>

									<div className='w-full h-auto pt-2 border-t-2 border-secondary'>
										<p className='text-sm text-gray-200'>
											IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고
											간편하게 제어하여 쾌적한 환경을 만들어줍니다.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Right Side */}
						<div className='md:w-[30%] md:h-auto h-3/5 flex flex-col justify-center md:mt-5'>
							<div className='relative'>
								<input
									type='text'
									className='w-full bg-transparent border-b-4 border-white py-2 pl-4 pr-10 focus:outline-none'
								/>
								<div className='absolute right-2 top-1/2 transform -translate-y-1/2'>
									<Search className='w-6 h-6 text-white' />
								</div>
							</div>
							<div className='flex flex-col gap-y-5'>
								<h1 className='md:text-6xl text-4xl font-semibold'>
									{title} <br />
									<span className='md:text-6xl text-4xl font-semibold'>
										{subtitle}
									</span>
								</h1>

								<p className='text-sm text-gray-200'>{description}</p>
								<div className='h-full flex justify-between  items-center'>
									<button className='w-fit py-1 px-4 mt- rounded-full bg-gray-400/75'>
										자세히보기
									</button>
									{/* Carousel Icons */}
									<div className='w-fit h-5 py-1 flex gap-3 items-center justify-center rounded-full bg-gray-500/50'>
										<button
											onClick={handlePrev}
											className='flex text-gray-200 text-lg'
										>
											<ChevronLeft size={20} />
											<span className='text-sm'>{currentIndex + 1}</span>
										</button>
										<div className='w-[1px] h-full bg-gray-200' />
										<button
											onClick={handleNext}
											className='flex text-gray-200 text-lg'
										>
											<span className='text-sm'>{carouselData.length}</span>
											<ChevronRight size={20} />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Hero
