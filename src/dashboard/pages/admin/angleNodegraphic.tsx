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
	doorNum: number
	updatedAt: string
	createdAt: string
	angle_x: number
	angle_y: number
}

interface GraphDataPoint {
	time: string
	angle_x: number
	angle_y: number
}

type SensorGraphProps = {
	buildingId: string | undefined
	doorNum: number | null
	graphData: GraphDataPoint[]
	hours: number
	onSelectTime: (time: number) => void
}

const SensorGraph: React.FC<SensorGraphProps> = ({
	doorNum,
	buildingId,
	graphData,
	hours,
	onSelectTime,
}) => {
	// const [data, setData] = useState<GraphDataPoint[]>([])
	const containerRef = useRef<HTMLDivElement>(null)
	const [containerHeight, setContainerHeight] = useState(300)
	const [data, setData] = useState<GraphDataPoint[]>(graphData)
	const isMobile = useMediaQuery('(max-width: 640px)')
	const isTablet = useMediaQuery('(max-width: 1024px)')
	const topicRef = useRef<string | null>(null)

	const timeOptions = [
		{ value: 1, label: '1 시간' },
		{ value: 6, label: '6 시간' },
		{ value: 12, label: '12 시간' },
		{ value: 24, label: '24 시간' },
	]

	useEffect(() => {
		setData(graphData)
	}, [graphData])

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

	const doorNumRef = useRef(doorNum)

	// 🔄 doorNum ni doim yangilab boramiz
	useEffect(() => {
		doorNumRef.current = doorNum
	}, [doorNum])

	// 🔌 socket faqat bir marta ulanadi
	useEffect(() => {
		console.log(data)
		const topic = `${buildingId}_angle-nodes`
		topicRef.current = topic
		const listener = (newData: SensorData) => {
			if (newData.doorNum !== doorNumRef.current) return

			console.log('Data accepted:', newData)
			// SensorData ni GraphDataPoint ga aylantiring
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
				if (updated.length > 1440) updated.shift()
				return updated
			})
		}

		socket.on(topic, listener)

		return () => {
			socket.off(topic, listener)
			console.log('Socket angle-data listener is off:', topic)
		}
	}, []) // faqat sahifa yuklanganda

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
						<CardTitle className='text-sm md:text-lg text-gray-00'>
							비계전도 데이터 실시간 모니터링
							<br />
							<span className='text-blue-400'>Node-{doorNum}</span>
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
									value={hours.toString()}
									onValueChange={value => onSelectTime(Number(value))}
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
