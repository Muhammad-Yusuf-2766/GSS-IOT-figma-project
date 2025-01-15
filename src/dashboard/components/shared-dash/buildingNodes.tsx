'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useState } from 'react'

interface DoorStatus {
	id: number
	isOpen: boolean
	batteryStatus: string
}

export default function BuildingNodes() {
	const [isConnected, setIsConnected] = useState(false)
	const [hasOpenDoors, setHasOpenDoors] = useState(false)
	const [doors, setDoors] = useState<DoorStatus[]>(
		Array.from({ length: 96 }, (_, i) => ({
			id: i,
			isOpen: i < 6,
			batteryStatus: '12.2V',
		}))
	)

	// useEffect(() => {
	// 	const socket = io('ws://localhost:3000')

	// 	socket.on('connect', () => {
	// 		setIsConnected(true)
	// 	})

	// 	socket.on('disconnect', () => {
	// 		setIsConnected(false)
	// 	})

	// 	return () => {
	// 		socket.disconnect()
	// 	}
	// }, [])

	useEffect(() => {
		const openDoors = doors.some(door => door.isOpen)
		setHasOpenDoors(openDoors)
	}, [doors])

	return (
		<div className='w-full md:p-5 mx-auto'>
			<div className='space-y-6'>
				<div className='text-center space-y-2'>
					<h1 className='text-2xl font-bold'>Hello MQTT & Socket.io</h1>
					<p className='text-muted-foreground'>
						Socket is {isConnected ? 'Connected' : 'Disconnected'}
					</p>
				</div>

				{hasOpenDoors && (
					<Alert variant='destructive'>
						<AlertDescription className='text-center'>
							There is some open doors,
							<br />
							So alarm audio play for 15 seconds
						</AlertDescription>
					</Alert>
				)}

				<ScrollArea className='md:h-[530px] h-[450px] w-full rounded-lg border border-slate-400'>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4'>
						{doors.map(door => (
							<Card
								key={door.id}
								className={`${
									door.isOpen ? 'bg-[#1e3a8a] text-white' : 'bg-gray-100'
								}`}
							>
								<CardContent className='p-6 text-center space-y-1'>
									<div className='text-xl font-medium'>
										{door.isOpen ? '열림' : '닫힘'}
									</div>
									<div className='text-sm'>
										Door is {door.isOpen ? 'Open' : 'Closed'}
									</div>
									<div className='text-sm'>
										Battery Status: {door.batteryStatus}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	)
}
