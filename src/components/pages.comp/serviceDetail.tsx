import { Button } from '@/components/ui/button'
import { navLinks, resourceServices } from '@/constants'
import { ArrowRight } from 'lucide-react'
import { Link, NavLink, useParams } from 'react-router-dom'

const ServiceDetail = () => {
	const { serviceId } = useParams<{ serviceId: string }>()

	// ID asosida `member` ma'lumotini topish
	const service = resourceServices.find(m => m.id === parseInt(serviceId || ''))
	if (!service) {
		return <div>Member not found!</div>
	}

	return (
		<div className='h-auto bg-white'>
			{/* Header */}
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
						<div className='flex items-center gap-4 text-sm'>
							<Link to='/login' className='hover:text-gray-600'>
								Log In
							</Link>
							<span>|</span>
							<Link to='/profile' className='hover:text-gray-600'>
								My Profile
							</Link>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className='h-full px-4 py-12 space-y-3'>
				<div className='w-full md:h-[70vh] md:flex justify-around items-center space-y-8'>
					{/* Image */}
					<div className='relative max-w-xl'>
						<img src={service.image} className='object-cover rounded-lg' />
					</div>

					{/* Content */}
					<div className='space-y-6'>
						<h1 className='text-5xl font-bold tracking-tight'>
							{service.title}

							<br />
							{service.subtitle}
						</h1>
						<p className='text-gray-600 leading-relaxed max-w-lg'>
							{service.description}
						</p>
						<Button className='group md:w-1/3 bg-gray-800 md:py-6 rounded-full'>
							카탈로그 보기
							<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
						</Button>
					</div>
				</div>
				{/* Video Player */}
				<h1 className='text-center text-gray-900 mt-8 text-3xl font-bold'>
					이 서비스의 목적
				</h1>
				<div className='aspect-video md:w-1/2 mx-auto bg-black rounded-lg overflow-hidden border border-gray-900'>
					<video
						src='/public/videos/회사-소개-동영상.mp4'
						controls
						className='w-full h-full'
						poster='/src/assets/pageBg.jpg'
					>
						<source src='#' type='video/mp4' />
						Your browser does not support the video tag.
					</video>
				</div>

				{/* Korean Text */}
				<p className='text-center text-zinc-600 mt-8 text-lg'>
					글로벌 스마트 솔루션은 고객의 니즈에 맞는 맞춤형 솔루션을 제공합니다.
				</p>
			</main>
		</div>
	)
}

export default ServiceDetail
