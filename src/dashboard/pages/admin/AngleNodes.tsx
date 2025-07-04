import AngleNodeScroll from '@/dashboard/components/shared-dash/AngleNodeScroll'
import {
	fetchBuildingAngleNodes,
	getAngleNodeSummary,
} from '@/services/apiRequests'
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
			// {
			// 	queryKey: ['dangerous-angle-node-graphic'],
			// 	// queryFn: getGateways,
			// 	retry: 1,
			// 	enabled: false,
			// },
			{
				queryKey: ['get-angle-node-summary'],
				queryFn: () => getAngleNodeSummary(buildingId!),
				retry: 1,
				// enabled: false,
			},
		],
	})

	// Ma'lumotlarni olish
	const buildingAngleNodes = queryData[0].data as IAngleNode[]
	const angleNodesSummary = queryData[1].data as IAngleNode[]
	// const refetch = queryData[0].refetch

	return (
		<div className='w-full max-h-screen bg-gray-50 p-2 md:p-5 space-y-4'>
			<AngleNodeScroll building_angle_nodes={buildingAngleNodes} />
			<SensorGraph />

			<div className='w-full h-full p-2 mt-5'>
				<h1>비계전도 노드 Summary</h1>
				{angleNodesSummary?.map(angleNode => (
					<div className='border border-slate-300 bg-gradient-to-r from-blue-50 to-blue-200 shadow-md hover:shadow-lg hover:to-blue-300 transition duration-200 ease-in-out rounded-xl cursor-pointer'>
						<div className='p-4 space-y-2 text-sm text-gray-700'>
							<div className='flex items-center justify-between'>
								<h1 className='font-bold text-blue-700'>노드 넘버</h1>
								<span className='text-blue-800 font-semibold text-lg'>
									{angleNode.doorNum}
								</span>
							</div>
							<div className='grid grid-cols-2 gap-x-4 gap-y-1'>
								<p className='font-medium text-gray-600'>Axis-X:</p>
								<p className='text-gray-800'>{angleNode.angle_x}</p>

								<p className='font-medium text-gray-600'>Axis-Y:</p>
								<p className='text-gray-800'>{angleNode.angle_y}</p>

								<p className='font-medium text-gray-600'>위치:</p>
								<p className='text-gray-800'>{angleNode.position}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AngleNodes
