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
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

// interface SensorData {
// 	doorNum: number
// 	updatedAt: string
// 	createdAt: string
// 	angle_x: number
// 	angle_y: number
// }

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
	graphData,
	hours,
	onSelectTime,
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	// const [containerHeight, setContainerHeight] = useState(300)
	const [data, setData] = useState<GraphDataPoint[]>(graphData)
	const isMobile = useMediaQuery('(max-width: 640px)')
	const isTablet = useMediaQuery('(max-width: 1024px)')

	useEffect(() => setData(graphData), [graphData])

	// ——— yordamchi: ostiga yozuvni har necha nuqtada bir ko‘rsatamiz
	const getLabelStep = () => {
		const len = data.length
		if (isMobile) {
			if (len > 90) return 12
			if (len > 60) return 8
			if (len > 30) return 6
			return 3
		}
		// tablet/desktop
		if (len > 120) return 12
		if (len > 80) return 8
		if (len > 40) return 6
		return 3
	}

	const labelStep = getLabelStep()

	const getChartMargins = () => {
		if (isMobile) return { top: 10, right: 10, left: 0, bottom: 18 }
		if (isTablet) return { top: 15, right: 20, left: 5, bottom: 22 }
		return { top: 20, right: 30, left: 20, bottom: 26 }
	}

	const formatXAxisTick = (value: string) => {
		if (isMobile) return value.split(':')[0] // soatgina
		return value
	}

	return (
		<div className='mx-auto pb-5'>
			<Card className='w-full border shadow-sm border-slate-400'>
				<CardHeader className='p-3 sm:p-4 space-y-2'>
					<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
						<CardTitle className='text-sm md:text-lg text-gray-900'>
							비계전도 데이터 실시간 모니터링 <br />
							<span className='text-blue-400'>Node-{doorNum}</span>
						</CardTitle>

						{/* ⬇️ soat select – oldingidek saqladik */}
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
									onValueChange={v => onSelectTime(Number(v))}
								>
									<SelectTrigger className='h-6 w-[90px] sm:w-[120px] text-xs sm:text-sm border border-slate-400'>
										<SelectValue placeholder='Select time' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='1' className='text-xs sm:text-sm'>
											1 시간
										</SelectItem>
										<SelectItem value='6' className='text-xs sm:text-sm'>
											6 시간
										</SelectItem>
										<SelectItem value='12' className='text-xs sm:text-sm'>
											12 시간
										</SelectItem>
										<SelectItem value='24' className='text-xs sm:text-sm'>
											24 시간
										</SelectItem>
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
					<div className='w-full h-full pb-4 px-1 sm:px-2'>
						<ResponsiveContainer width='100%' height={300}>
							<LineChart data={data} margin={getChartMargins()}>
								<CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
								<XAxis
									dataKey='time'
									tick={{ fontSize: isMobile ? 9 : 12 }}
									tickFormatter={formatXAxisTick}
									height={isMobile ? 20 : 30}
									tickMargin={isMobile ? 5 : 10}
									minTickGap={isMobile ? 15 : 30}
									interval={labelStep} // bu yerda labelStep ni qo‘shamiz
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

								{!isMobile && (
									<Legend
										wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
									/>
								)}

								{/* Threshold chiziqlar (ixtiyoriy) */}
								<ReferenceLine y={0.3} strokeDasharray='5 5' />
								<ReferenceLine y={-0.3} strokeDasharray='5 5' />

								{/* 1) Angle X chizig‘i va nuqtalar */}
								<Line
									type='monotone'
									dataKey='angle_x'
									stroke='#ef4444'
									strokeWidth={isMobile ? 1.5 : 2}
									dot={false} // nuqtani yoqamiz
									name='Angle X'
									// activeDot={{ r: isMobile ? 4 : 6 }}
								/>

								{/* 3) Angle Y chizig‘i */}
								<Line
									type='monotone'
									dataKey='angle_y'
									stroke='#3b82f6'
									strokeWidth={isMobile ? 1.5 : 2}
									dot={false}
									name='Angle Y'
									// activeDot={{ r: isMobile ? 4 : 6 }}
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
