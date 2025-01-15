import backgroundImage from '@/assets/pageBg3.jpg'
import { CommunityMain } from '@/components/pages.comp/community'
import PagesNavbar from '@/components/shared/pagesNavbar'
import { IResource } from '@/types/interfaces'

const Community = () => {
	const resource: IResource = {
		img: backgroundImage,
		title: 'Community',
	}
	return (
		<div>
			<PagesNavbar data={resource} />
			<CommunityMain />
		</div>
	)
}

export default Community
