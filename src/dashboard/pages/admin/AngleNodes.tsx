import AngleNodeScroll from '@/dashboard/components/shared-dash/AngleNodeScroll'
import SensorGraph from '@/dashboard/pages/admin/angleNodegraphic'
import socket from '@/hooks/useSocket'
import { fetchBuildingAngleNodes } from '@/services/apiRequests'
import { useQueries, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
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
	const queryClient = useQueryClient()

	const queryData = useQueries({
		queries: [
			{
				queryKey: ['get-building-angle-nodes'],
				queryFn: () => fetchBuildingAngleNodes(buildingId!),
				retry: 1,
			},
			// {
			//   queryKey: ['get-angle-node-summary'],
			//   queryFn: () => getAngleNodeSummary(buildingId!),
			//   retry: 1,
			//   enabled: false,
			// },
		],
	})

	const buildingAngleNodes = (queryData[0].data as IAngleNode[]) || []

	// Xavfli nodlar (memo)
	const dangerAngleNodes = useMemo(
		() =>
			buildingAngleNodes.filter(it => it.angle_x >= 0.3 || it.angle_x <= -0.3),
		[buildingAngleNodes]
	)

	// 1) birinchi tanlov
	useEffect(() => {
		if (!isFirstLoad) return
		if (dangerAngleNodes.length) {
			setSelectedDoorNum(dangerAngleNodes[0].doorNum)
			setIsFirstLoad(false)
			return
		}
		if (buildingAngleNodes.length) {
			setSelectedDoorNum(buildingAngleNodes[0].doorNum)
			setIsFirstLoad(false)
		}
	}, [dangerAngleNodes, buildingAngleNodes, isFirstLoad])

	// 2) tarixiy grafik ma’lumotini REST orqali olish (tanlangan vaqt va door bo‘yicha)
	useEffect(() => {
		if (!selectedDoorNum) return
		const now = new Date()
		const from = new Date(
			now.getTime() - selectedHours * 60 * 60 * 1000
		).toISOString()
		const to = now.toISOString()

		axios
			.get<SensorData[]>('/product/angle-node/data', {
				params: { doorNum: selectedDoorNum, from, to },
				baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3005',
			})
			.then(res => {
				const formatted: GraphDataPoint[] = res.data.map(item => ({
					time: new Date(item.createdAt).toLocaleTimeString('ko-KR', {
						hour: '2-digit',
						minute: '2-digit',
						hour12: false,
					}),
					angle_x: item.angle_x,
					angle_y: item.angle_y,
				}))
				setData(formatted)
			})
			.catch(err => console.error('Data fetch error:', err))
	}, [selectedDoorNum, selectedHours])

	// 3) 🔌 SOCKET — parent’da tinglash: list va grafikni yangilash
	useEffect(() => {
		if (!buildingId) return
		const topic = `${buildingId}_angle-nodes`

		const listener = (newData: SensorData) => {
			// 3.1 List (AngleNodeScroll) ma’lumotini yangilash — React Query keshida
			queryClient.setQueryData<IAngleNode[]>(
				['get-building-angle-nodes'],
				(old = []) => {
					let found = false
					const updated = old.map(n => {
						if (n.doorNum === newData.doorNum) {
							found = true
							return {
								...n,
								angle_x: newData.angle_x,
								angle_y: newData.angle_y,
								// ixtiyoriy: oxirgi yangilanish uchun maydon
								createdAt: new Date(newData.createdAt).toISOString(),
							} as IAngleNode
						}
						return n
					})
					// Agar node ro‘yxatda yo‘q bo‘lsa (kutilmagan holat) — qo‘shib qo‘yish
					if (!found) {
						updated.push({
							_id: crypto.randomUUID(),
							doorNum: newData.doorNum,
							angle_x: newData.angle_x,
							angle_y: newData.angle_y,
							position: 'N/A',
						} as unknown as IAngleNode)
					}
					return updated
				}
			)

			// 3.2 Tanlangan node grafikini jonli yangilash
			if (selectedDoorNum === newData.doorNum) {
				const point: GraphDataPoint = {
					time: new Date(newData.updatedAt).toLocaleTimeString('ko-KR', {
						hour: '2-digit',
						minute: '2-digit',
						timeZone: 'Asia/Seoul',
						hour12: false,
					}),
					angle_x: newData.angle_x,
					angle_y: newData.angle_y,
				}
				setData(prev => {
					const next = [...prev, point]
					return next.length > 140 ? next.slice(next.length - 140) : next
				})
			}
		}

		socket.on(topic, listener)
		return () => {
			socket.off(topic, listener)
		}
	}, [buildingId, queryClient, selectedDoorNum])

	return (
		<div className='w-full max-h-screen bg-gray-50 p-2 md:p-5 space-y-4'>
			<AngleNodeScroll
				onSelectNode={door => setSelectedDoorNum(door)}
				building_angle_nodes={buildingAngleNodes}
				dangerAngleNodes={dangerAngleNodes}
			/>
			<SensorGraph
				graphData={data}
				buildingId={buildingId}
				doorNum={selectedDoorNum}
				onSelectTime={setSelectedHours}
				hours={selectedHours}
			/>
		</div>
	)
}

export default AngleNodes
