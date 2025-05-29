import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import socket from '@/hooks/useSocket'
import axios from 'axios'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

interface SensorData {
	createdAt: string
	angle_x: number
	angle_y: number
}

interface GraphDataPoint {
	time: string
	angle_x: number
	angle_y: number
}

const SensorGraph: React.FC = () => {
	const [data, setData] = useState<GraphDataPoint[]>([])
	const [selectedHours, setSelectedHours] = useState<number>(1)
	const containerRef = useRef<HTMLDivElement>(null)
	const [containerHeight, setContainerHeight] = useState(300)
	const isMobile = useMediaQuery('(max-width: 640px)')
	const isTablet = useMediaQuery('(max-width: 1024px)')

	const timeOptions = [
		{ value: 1, label: '1 시간' },
		{ value: 6, label: '6 시간' },
		{ value: 12, label: '12 시간' },
		{ value: 24, label: '24 시간' },
	]

	// Calculate container height based on screen size
	useEffect(() => {
		const updateHeight = () => {
			if (containerRef.current) {
				const viewportHeight = window.innerHeight
				if (isMobile) {
					setContainerHeight(Math.min(250, viewportHeight * 0.4))
				} else if (isTablet) {
					setContainerHeight(Math.min(300, viewportHeight * 0.5))
				} else {
					setContainerHeight(Math.min(400, viewportHeight * 0.6))
				}
			}
		}

		updateHeight()
		window.addEventListener('resize', updateHeight)
		return () => window.removeEventListener('resize', updateHeight)
	}, [isMobile, isTablet])

	useEffect(() => {
		const now = new Date()
		const from = new Date(
			now.getTime() - selectedHours * 60 * 60 * 1000
		).toISOString()
		const to = now.toISOString()

		axios
			.get<SensorData[]>(
				`http://localhost:3005/product/angle-node/data?doorNum=150&from=${from}&to=${to}`
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

		const listener = (newData: SensorData) => {
			console.log('Socket angle-data listener is on')
			console.log(newData)
			const formattedPoint: GraphDataPoint = {
				time: new Date(newData.createdAt).toLocaleTimeString('en-GB', {
					hour: '2-digit',
					minute: '2-digit',
				}),
				angle_x: newData.angle_x,
				angle_y: newData.angle_y,
			}

			setData(prev => {
				const updated = [...prev, formattedPoint]
				const maxSize = 1440
				if (updated.length > maxSize) {
					updated.shift()
				}
				return updated
			})
		}

		socket.on('angle-data', listener)

		return () => {
			socket.off('angle-data', listener)
			console.log('Socket angle-data listener is off')
		}
	}, [selectedHours])

	// Calculate dynamic margins based on screen size
	const getChartMargins = () => {
		if (isMobile) {
			return { top: 10, right: 10, left: 0, bottom: 0 }
		} else if (isTablet) {
			return { top: 15, right: 20, left: 5, bottom: 2 }
		}
		return { top: 20, right: 30, left: 20, bottom: 0 }
	}

	// Format tick values for better mobile display
	const formatXAxisTick = (value: string) => {
		if (isMobile) {
			// For mobile, show only hour
			const parts = value.split(':')
			return parts[0]
		}
		return value
	}

	return (
		<div className='mx-auto pb-5'>
			<Card className='w-full border shadow-sm border-slate-400'>
				<CardHeader className='p-3 sm:p-4 space-y-2'>
					<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
						<CardTitle className='text-base md:text-lg font-bold text-gray-900'>
							비계전도 데이터 모니터링
						</CardTitle>

						<div className='flex flex-row items-center justify-between sm:justify-end gap-3'>
							<div className='flex items-center gap-x-2'>
								<label
									htmlFor='time-filter'
									className='text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap'
								>
									기간:
								</label>
								<Select
									value={selectedHours.toString()}
									onValueChange={value => setSelectedHours(Number(value))}
								>
									<SelectTrigger className='h-6 w-[90px] sm:w-[120px] text-xs sm:text-sm border border-slate-400'>
										<SelectValue placeholder='Select time' />
									</SelectTrigger>
									<SelectContent>
										{timeOptions.map(option => (
											<SelectItem
												key={option.value}
												value={option.value.toString()}
												className='text-xs sm:text-sm'
											>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<Badge variant='outline' className='h-6 text-xs border-slate-400'>
								데이터 수: {data.length}
							</Badge>
						</div>
					</div>

					{/* Mobile Legend - Always visible for better UX */}
					{/* <div className='flex flex-wrap gap-4 justify-center'>
						<div className='flex items-center gap-2'>
							<div className='w-4 h-2 bg-red-500 rounded-sm'></div>
							<span className='text-xs text-gray-600'>Angle X</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-4 h-2 bg-blue-500 rounded-sm'></div>
							<span className='text-xs text-gray-600'>Angle Y</span>
						</div>
					</div> */}
				</CardHeader>

				<CardContent className='p-0 pt-2' ref={containerRef}>
					{/* Chart Container */}
					<div className='w-full h-full pb-4 px-1 sm:px-2'>
						<ResponsiveContainer width='100%' height={containerHeight}>
							<LineChart data={data} margin={getChartMargins()}>
								<CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
								<XAxis
									dataKey='time'
									tick={{ fontSize: isMobile ? 9 : 12 }}
									tickFormatter={formatXAxisTick}
									height={isMobile ? 20 : 30}
									tickMargin={isMobile ? 5 : 10}
									minTickGap={isMobile ? 15 : 30}
								/>
								<YAxis
									domain={['auto', 'auto']}
									tick={{ fontSize: isMobile ? 9 : 12 }}
									width={isMobile ? 25 : 35}
									tickMargin={isMobile ? 2 : 5}
								/>
								<Tooltip
									contentStyle={{
										backgroundColor: 'white',
										border: '1px solid #ccc',
										borderRadius: '8px',
										fontSize: isMobile ? '12px' : '14px',
										padding: isMobile ? '4px' : '8px',
									}}
									itemStyle={{ padding: isMobile ? '1px 0' : '2px 0' }}
									labelStyle={{ marginBottom: isMobile ? '2px' : '5px' }}
								/>
								{/* Hide legend on mobile for more chart space */}
								{!isMobile && (
									<Legend
										wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
									/>
								)}
								<Line
									type='monotone'
									dataKey='angle_x'
									stroke='#ef4444'
									strokeWidth={isMobile ? 1.5 : 2}
									dot={false}
									name='Angle X'
									activeDot={{ r: isMobile ? 4 : 6 }}
								/>
								<Line
									type='monotone'
									dataKey='angle_y'
									stroke='#3b82f6'
									strokeWidth={isMobile ? 1.5 : 2}
									dot={false}
									name='Angle Y'
									activeDot={{ r: isMobile ? 4 : 6 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default SensorGraph
