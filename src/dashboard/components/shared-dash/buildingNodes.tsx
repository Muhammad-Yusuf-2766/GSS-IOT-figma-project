'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { INode } from '@/types/interfaces'
import { useState } from 'react'
import TotalcntCsv from './TotalnctCSV'

interface INodeProps {
	nodes: INode[] | []
}

const BuildingNodes = ({ nodes }: INodeProps) => {
	const [filteredNodes, setFilteredNodes] = useState(nodes) // Filtrlangan nodlar

	const handleFilterChange = (filterOpenDoors: boolean) => {
		if (filterOpenDoors) {
			setFilteredNodes(nodes.filter(node => node.doorChk === 1)) // Faqat eshik ochiq bo'lganlarni saqlash
		} else {
			setFilteredNodes(nodes) // Barcha nodlarni saqlash
		}
	}

	// ========== Battery percentage ============ //
	const getBatteryIconAndPercentage = (batteryLevel: number) => {
		// let icon
		let color
		let percentage

		switch (true) {
			case batteryLevel >= 42:
				color = 'bg-green-500'
				percentage = '100%'
				break
			case batteryLevel >= 41:
				color = 'bg-green-500'
				percentage = '84%'
				break
			case batteryLevel >= 40:
				color = 'bg-green-500'
				percentage = '65%'
				break
			case batteryLevel >= 39:
				color = 'bg-blue-400'
				percentage = '56%'
				break
			case batteryLevel >= 38:
				color = 'bg-green-400'
				percentage = '50%'
				break
			case batteryLevel >= 37:
				color = 'bg-red-400'
				percentage = '41%'
				break
			case batteryLevel >= 36:
				color = 'bg-red-400'
				percentage = '35%'
				break
			case batteryLevel >= 35:
				color = 'bg-red-400'
				percentage = '25%'
				break
			case batteryLevel >= 34:
				color = 'bg-red-400'
				percentage = '20%'
				break
			case batteryLevel >= 30:
				color = 'bg-red-500'
				percentage = '10%'
				break

			default:
				color = 'bg-blue-700'
				percentage = '100%'
		}

		return { color, percentage }
	}
	// ========== Battery percentage ============ //

	return (
		<div className='w-full md:p-5 mx-auto'>
			<div className='space-y-6'>
				<div className='text-center space-y-2'>
					<h1 className='md:text-2xl text-lg md:font-bold font-semibold'>
						Hello MQTT & Socket.io
					</h1>
				</div>

				{/* TotalcntCsv komponenti */}
				<div className='w-full'>
					<TotalcntCsv nodes={nodes} onFilterChange={handleFilterChange} />
				</div>

				{/* Filtrlangan nodlarni ko'rsatish */}
				<ScrollArea className='md:h-[530px] h-[74vh] w-full rounded-lg border border-slate-400'>
					<div className='grid grid-cols-3  md:grid-cols-6 md:gap-4 gap-2 md:p-4 p-2'>
						{filteredNodes.map(door => {
							const { color, percentage } = getBatteryIconAndPercentage(
								door.betChk
							)
							return (
								<Card
									key={door._id}
									className={`${
										door.doorChk
											? 'bg-[#1e3a8a] text-white '
											: 'bg-gray-100 border border-blue-900'
									}`}
								>
									{/* <p className='w-5 h-5 flex justify-center items-center rounded-full bg-white border-indigo-400 border text-gray-700 absolute top-0 left-0'>
									{door.doorNum}
								</p> */}
									<CardContent className='md:p-6 p-2 text-center space-y-1 md:text-xl text-sm relative'>
										<p className='md:w-7 md:h-7 w-5 h-5 flex justify-center items-center rounded-full bg-white border-blue-800 border text-blue-700 absolute -top-1 -left-1 text-sm'>
											{door.doorNum}
										</p>
										<div className='flex items-center gap-2 text-sm bg-gray-300 p-1 rounded-md mb-2'>
											<p className='text-gray-700'>위치: {door.position}</p>
										</div>
										<div className=''>{door.doorChk ? '열림' : '닫힘'}</div>
										<div className='w-full flex justify-center items-center space-x-4'>
											<div className='md:w-2/3 w-full bg-gray-300 rounded-full md:h-4 h-2'>
												<div
													className={`${color} h-full rounded-full`}
													style={{ width: `${percentage}` }}
												></div>
											</div>
											<span className='text-[10px] '>{percentage}</span>
										</div>
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
