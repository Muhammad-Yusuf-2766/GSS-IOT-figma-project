import backgroundImage from '@/assets/pageBs2.jpg'
import ServicesMain from '@/components/pages.comp/servicesMain'
import PagesNavbar from '@/components/shared/pagesNavbar'
import { IResource } from '@/types/interfaces'

const Services = () => {
	const resource: IResource = {
		img: backgroundImage,
		title: 'Services',
	}
	return (
		<div className='overflow-hidden'>
			<PagesNavbar data={resource} />
			<ServicesMain />
		</div>
	)
}

export default Services
