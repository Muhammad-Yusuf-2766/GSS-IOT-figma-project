import AngleNodeScroll from '@/dashboard/components/shared-dash/AngleNodeScroll'
import { fetchBuildingAngleNodes } from '@/services/apiRequests'
import SensorGraph from '@/test/angleNodegraphic'
import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { IAngleNode } from '../../../types/interfaces'

const AngleNodes = () => {
	const { buildingId } = useParams()

	const queryData = useQueries({
		queries: [
			{
				queryKey: ['get-building-angle-nodes'],
				queryFn: () => fetchBuildingAngleNodes(buildingId!),
				retry: 1,
				// enabled: false,
			},
			{
				queryKey: ['dangerous-angle-node-graphic'],
				// queryFn: getGateways,
				retry: 1,
				enabled: false,
			},
		],
	})

	// Ma'lumotlarni olish
	const buildingAngleNodes = queryData[0].data as IAngleNode[]
	// const refetch = queryData[0].refetch

	return (
		<div className='w-full max-h-screen bg-gray-50 p-2 md:p-5 space-y-4'>
			<AngleNodeScroll building_angle_nodes={buildingAngleNodes} />
			<SensorGraph />
		</div>
	)
}

export default AngleNodes
