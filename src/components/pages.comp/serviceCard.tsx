import { IResourceData } from '@/types/interfaces'
import { MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface IServicePops {
	service: IResourceData
}

const ServiceCard = ({ service }: IServicePops) => {
	return (
		<div
			key={service.title}
			className='w-full md:h-screen h-[400px] flex items-end justify-start pb-10 md:px-14 px-5 col-span-1 relative border'
			style={{
				backgroundImage: `url(${service.image})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className='absolute inset-0 bg-black/30 z-10' />
			<div className='md:h-1/4 flex justify-between md:gap-x-12 z-30'>
				<div className='flex flex-col gap-y-10'>
					<h1 className='md:text-4xl font-semibold'>
						{service.title} <br />
						<span className='md:text-4xl font-semibold'>
							{service.subtitle}
						</span>
					</h1>
					<p className='text-xl'>{service.info}</p>
				</div>
				<Link to={`/services/${service.id}`}>
					<div className='w-fit h-fit rounded-full bg-blue-900/80 text-2xl font-thin p-5 text-center cursor-pointer group'>
						more
						<MoveRight className='group-hover:translate-x-3 transition-transform duration-200' />
					</div>
				</Link>
			</div>
		</div>
	)
}

export default ServiceCard
