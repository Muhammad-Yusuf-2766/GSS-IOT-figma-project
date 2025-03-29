'use client'

import FillLoading from '@/components/shared/fill-laoding'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useBuildingNodes } from '@/hooks/useClientdata'
import { useClientStore } from '@/stores/buildingsStore'
import { useBuildingNodesStore } from '@/stores/nodeStore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { INode } from '../../../types/interfaces'
import TotalcntCsv, { NodesMultipleButtonsField } from './TotalnctCSV'
const socket = io(`${import.meta.env.VITE_SERVER_BASE_URL}`) // Backend server manzilini o'zgartiring

const BuildingNodes = () => {
	const { building, nodes, updateNode } = useBuildingNodesStore()
	const { client } = useClientStore()
	const [filteredNodes, setFilteredNodes] = useState<INode[]>(nodes || [])
	const { buildingId } = useParams()

	if (!buildingId) {
		throw new Error('Building ID is missing')
	}

	const { isLoading } = useBuildingNodes(buildingId)

	useEffect(() => {
		const topic = `mqtt/building/${buildingId}`
		socket.on(topic, (updatedNode: INode) => {
			updateNode(updatedNode)
		})

		return () => {
			socket.off(topic)
		}
	}, [buildingId, updateNode])

	useEffect(() => {
		setFilteredNodes(nodes)
	}, [nodes])

	const handleFilterChange = (filterOpenDoors: boolean) => {
		if (filterOpenDoors) {
			setFilteredNodes(nodes.filter(node => node.doorChk === 1))
		} else {
			setFilteredNodes(nodes)
		}
	}

	// ========== Battery percentage ============ //
	const getBatteryIconAndPercentage = (batteryLevel: number) => {
		// let icon
		let color
		let percentage

		switch (true) {
			case batteryLevel >= 39:
				color = 'bg-blue-400'
				percentage = '100%'
				break
			case batteryLevel >= 38:
				color = 'bg-blue-400'
				percentage = '87%'
				break
			case batteryLevel >= 37:
				color = 'bg-blue-400'
				percentage = '74%'
				break
			case batteryLevel >= 36:
				color = 'bg-blue-400'
				percentage = '68%'
				break
			case batteryLevel >= 35:
				color = 'bg-blue-400'
				percentage = '55%'
				break
			case batteryLevel >= 34:
				color = 'bg-blue-400'
				percentage = '50%'
				break
			case batteryLevel >= 33:
				color = 'bg-blue-400'
				percentage = '43%'
				break
			case batteryLevel >= 32:
				color = 'bg-blue-400'
				percentage = '32%'
				break
			case batteryLevel >= 31:
				color = 'bg-red-400'
				percentage = '27%'
				break
			case batteryLevel >= 30:
				color = 'bg-red-400'
				percentage = '20%'
				break
			case batteryLevel >= 29:
				color = 'bg-red-500'
				percentage = '10%'
				break
			default:
				color = 'bg-blue-400'
				percentage = '100%'
		}

		return { color, percentage }
	}
	// ========== Battery percentage ============ //

	if (isLoading) {
		return <FillLoading />
	}

	return (
		<div className='w-full md:p-5 mx-auto'>
			<div className='space-y-6'>
				<div className='text-center space-y-2'>
					<h1 className='md:text-2xl text-lg md:font-bold font-semibold text-gray-700'>
						{client?.client_name} building-{building?.building_num}
					</h1>
				</div>

				{/* TotalcntCsv komponenti */}
				<div className='w-full'>
					<TotalcntCsv
						nodes={nodes}
						onFilterChange={handleFilterChange}
						building={building || undefined}
					/>
					<NodesMultipleButtonsField building={building!} />
				</div>

				{/* Filtrlangan nodlarni ko'rsatish */}
				<ScrollArea className='md:h-[530px] h-[74vh] w-full rounded-lg border border-slate-400'>
					<div className='grid grid-cols-3  md:grid-cols-6 md:gap-4 gap-2 md:p-4 p-2'>
						{filteredNodes?.map((door, index) => {
							const { color, percentage } = getBatteryIconAndPercentage(
								door.betChk
							)
							return (
								<Card
									key={door._id}
									className={`${
										door.doorChk
											? 'bg-red-500 text-white '
											: 'bg-[#1e3a8a] text-white '
									}`}
								>
									<CardContent className='md:p-4 p-1 text-center space-y-1 md:text-xl text-sm relative'>
										<p className='md:w-7 md:h-7 w-5 h-5 flex justify-center items-center rounded-full bg-white border-blue-800 border text-blue-700 absolute -top-1 -left-1 text-sm'>
											{index + 1}
										</p>
										<div className='md:text-lg'>
											{door.doorNum}-{door.doorChk ? '열림' : '닫힘'}
										</div>
										{/* Battery check - 3.7v */}
										<div className='w-full flex justify-center items-center md:space-x-2'>
											<span className='text-[10px] '>3.7v:</span>
											<div className='md:w-2/3 md:flex hidden w-full bg-white rounded-full md:h-2 h-1'>
												<div
													className={`${color} h-full rounded-full`}
													style={{ width: `${percentage}` }}
												></div>
											</div>
											<span className='text-[10px] '>{percentage}</span>
										</div>
										{/* Battery check - 12v */}
										<div className='w-full flex justify-center items-center md:space-x-2'>
											<span className='text-[10px] '>12v:</span>
											<div className='md:w-2/3 md:flex hidden w-full bg-white rounded-full md:h-2 h-1'>
												<div
													className={`${color} h-full rounded-full`}
													style={{ width: `${percentage}` }}
												></div>
											</div>
											<span className='text-[10px] '>{percentage}</span>
										</div>

										{/* Position */}
										{door.position !== '' && (
											<p className='md:py-1 md:text-sm text-[10px] bg-blue-500 rounded-md font-semibold'>
												{door.position}
											</p>
										)}
									</CardContent>
								</Card>
							)
						})}
					</div>
				</ScrollArea>
			</div>
		</div>
	)
}

export default BuildingNodes
