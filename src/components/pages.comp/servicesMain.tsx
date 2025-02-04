import { resourceServices } from '@/constants'
import ServiceCard from './serviceCard'

const ServicesMain = () => {
	return (
		<div className='w-full relative'>
			<div className='w-full grid md:grid-cols-2 text-secondary relative z-10'>
				{resourceServices.map(service => (
					<ServiceCard key={service.id} service={service} />
				))}
			</div>
		</div>
	)
}

export default ServicesMain
