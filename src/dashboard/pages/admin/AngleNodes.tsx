import AngleNodeScroll from '@/dashboard/components/shared-dash/AngleNodeScroll'
import SensorGraph from '@/test/angleNodegraphic'

const AngleNodes = () => {
	return (
		<div className='w-full max-h-screen bg-gray-50 p-2 md:p-5 space-y-4'>
			<AngleNodeScroll />
			<SensorGraph />
		</div>
	)
}

export default AngleNodes
