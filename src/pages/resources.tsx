import backgroundImage from '@/assets/pageBg.jpg'
import Footer from '@/components/home.comps/Footer'
import ResourceMain from '@/components/pages.comp/resourceMain'
import PagesNavbar from '@/components/shared/pagesNavbar'
import { IResource } from '@/types/interfaces'

const Resource = () => {
	const resource: IResource = {
		img: backgroundImage,
		title: 'Resources',
	}
	return (
		<div className='overflow-hidden'>
			<PagesNavbar data={resource} />
			<ResourceMain />
			<Footer />
		</div>
	)
}

export default Resource
