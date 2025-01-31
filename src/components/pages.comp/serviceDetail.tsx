import { Button } from '@/components/ui/button'
import { resourceServices } from '@/constants'
import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const ServiceDetail = () => {
	const { serviceId } = useParams<{ serviceId: string }>()

	// ID asosida `member` ma'lumotini topish
	const service = resourceServices.find(m => m.id === parseInt(serviceId || ''))
	if (!service) {
		return <div>Member not found!</div>
	}

	return (
		<div className='min-h-screen bg-white'>
			{/* Header */}
			<header className='border-b'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-12'>
							{/* Logo */}
							<Link to='/' className='flex items-center text-gray-900'>
								<img src='/src/assets//gsslogo-black-figma.svg' alt='' />
							</Link>

							{/* Navigation */}
							<nav className='hidden md:flex items-center gap-8'>
								<Link
									to='/'
									className='text-sm font-medium hover:text-gray-600'
								>
									Home
								</Link>
								<Link
									to='/resources'
									className='text-sm font-medium hover:text-gray-600'
								>
									Resources
								</Link>
								<Link
									to='/services'
									className='text-sm font-medium hover:text-gray-600'
								>
									Services
								</Link>
								<Link
									to='/community'
									className='text-sm font-medium hover:text-gray-600'
								>
									Community
								</Link>
								<Link
									to='/dashboard'
									className='text-sm font-medium hover:text-gray-600'
								>
									Dashboard
								</Link>
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
			<main className='w-full h-full container mx-auto px-4 py-12 flex justify-center items-center'>
				<div className='w-full h-full md:flex justify-around items-center space-y-8'>
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
			</main>
		</div>
	)
}

export default ServiceDetail
