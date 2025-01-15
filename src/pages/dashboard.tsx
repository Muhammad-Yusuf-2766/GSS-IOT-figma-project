import backgroundImage from '@/assets/pageBg4.jpg'
import PagesNavbar from '@/components/shared/pagesNavbar'
import Layout from '@/dashboard/layout'
import { IResource } from '@/types/interfaces'

const Dashboard = () => {
	const resource: IResource = {
		img: backgroundImage,
		title: 'Dashboard',
	}
	return (
		<div className='w-full h-full flex flex-col'>
			<div className='md:block hidden'>
				<PagesNavbar data={resource} />
			</div>

			<Layout />
		</div>
	)
}

export default Dashboard
