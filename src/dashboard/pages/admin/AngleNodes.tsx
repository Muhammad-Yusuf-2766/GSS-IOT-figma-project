import AngleNodeScroll from '@/dashboard/components/shared-dash/AngleNodeScroll'
import {
	fetchBuildingAngleNodes,
	getAngleNodeSummary,
} from '@/services/apiRequests'
import SensorGraph from '@/test/angleNodegraphic'
import { useQueries } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IAngleNode } from '../../../types/interfaces'

export interface SensorData {
	doorNum: number
	updatedAt: string
	createdAt: string
	angle_x: number
	angle_y: number
}

export interface GraphDataPoint {
	time: string
	angle_x: number
	angle_y: number
}

const AngleNodes = () => {
	const [selectedDoorNum, setSelectedDoorNum] = useState<number | null>(null)
	const [selectedHours, setSelectedHours] = useState<number>(1)
	const [data, setData] = useState<GraphDataPoint[]>([])
	const [isFirstLoad, setIsFirstLoad] = useState(true)
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
				enabled: false,
			},
		],
	})

	// Ma'lumotlarni olish
	const buildingAngleNodes = queryData[0].data as IAngleNode[] | []
	const angleNodesSummary = queryData[1].data as IAngleNode[]
	const dangerAngleNodes =
		buildingAngleNodes?.filter(
			item =>
				item.angle_x >= 0.3 ||
				item.angle_y >= 0.3 ||
				item.angle_x <= -0.3 ||
				item.angle_y <= -0.3
		) || []

	// const refetch = queryData[0].refetch

	// 1. doorNum ni dangerAngleNodes'dan tanlab olish
	useEffect(() => {
		if (!dangerAngleNodes.length || !isFirstLoad) return
		setSelectedDoorNum(dangerAngleNodes[0].doorNum)
		setIsFirstLoad(false)
	}, [dangerAngleNodes, isFirstLoad])

	useEffect(() => {
		if (!selectedDoorNum) return

		const now = new Date()
		const from = new Date(
			now.getTime() - selectedHours * 60 * 60 * 1000
		).toISOString()
		const to = now.toISOString()

		axios
			.get<SensorData[]>(
				`http://localhost:3005/product/angle-node/data?doorNum=${selectedDoorNum}&from=${from}&to=${to}`
			)
			.then(res => {
				const formatted: GraphDataPoint[] = res.data.map(item => ({
					time: new Date(item.createdAt).toLocaleTimeString('en-GB', {
						hour: '2-digit',
						minute: '2-digit',
					}),
					angle_x: item.angle_x,
					angle_y: item.angle_y,
				}))
				setData(formatted)
			})
			.catch(err => {
				console.error('Data fetch error:', err)
			})
	}, [selectedDoorNum, selectedHours])

	return (
		<div className='w-full max-h-screen bg-gray-50 p-2 md:p-5 space-y-4'>
			<AngleNodeScroll
				onSelectNode={(doorNum: number) => setSelectedDoorNum(doorNum)}
				building_angle_nodes={buildingAngleNodes}
				dangerAngleNodes={dangerAngleNodes}
			/>
			<SensorGraph
				graphData={data}
				buildingId={buildingId}
				doorNum={selectedDoorNum}
				onSelectTime={time => setSelectedHours(time)}
				hours={selectedHours}
			/>

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
