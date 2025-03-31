'use client'

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import React from 'react'

const chartData = [
	{ date: '2024-04-01', desktop: 222 },
	// { date: '2024-04-02', desktop: 97 },
	// { date: '2024-04-03', desktop: 167 },
	// { date: '2024-04-04', desktop: 242 },
	// { date: '2024-04-05', desktop: 373 },
	// { date: '2024-04-06', desktop: 301 },
	// { date: '2024-04-07', desktop: 245 },
	// { date: '2024-04-08', desktop: 409 },
	// { date: '2024-04-09', desktop: 59 },
	// { date: '2024-04-10', desktop: 261 },
	// { date: '2024-04-11', desktop: 327 },
	// { date: '2024-04-12', desktop: 292 },
	// { date: '2024-04-13', desktop: 342 },
	// { date: '2024-04-14', desktop: 137 },
	// { date: '2024-04-15', desktop: 120 },
	// { date: '2024-04-16', desktop: 138 },
	// { date: '2024-04-17', desktop: 446 },
	// { date: '2024-04-18', desktop: 364 },
	// { date: '2024-04-19', desktop: 243 },
	// { date: '2024-04-20', desktop: 89 },
	// { date: '2024-04-21', desktop: 137 },
	// { date: '2024-04-22', desktop: 224 },
	// { date: '2024-04-23', desktop: 138 },
	// { date: '2024-04-24', desktop: 387 },
	// { date: '2024-04-25', desktop: 215 },
	// { date: '2024-04-26', desktop: 75 },
	// { date: '2024-04-27', desktop: 383 },
	// { date: '2024-04-28', desktop: 122 },
	// { date: '2024-04-29', desktop: 315 },
	// { date: '2024-04-30', desktop: 454 },
	// { date: '2024-05-01', desktop: 165 },
	// { date: '2024-05-02', desktop: 293 },
	// { date: '2024-05-03', desktop: 247 },
	// { date: '2024-05-04', desktop: 385 },
	// { date: '2024-05-05', desktop: 481 },
	// { date: '2024-05-06', desktop: 498 },
	// { date: '2024-05-07', desktop: 388 },
	// { date: '2024-05-08', desktop: 149 },
	// { date: '2024-05-09', desktop: 227 },
	// { date: '2024-05-10', desktop: 293 },
	// { date: '2024-05-11', desktop: 335 },
	{ date: '2024-05-12', desktop: 197 },
	{ date: '2024-05-13', desktop: 197 },
	{ date: '2024-05-14', desktop: 448 },
	{ date: '2024-05-15', desktop: 473 },
	{ date: '2024-05-16', desktop: 338 },
	{ date: '2024-05-17', desktop: 499 },
	{ date: '2024-05-18', desktop: 315 },
	{ date: '2024-05-19', desktop: 235 },
	{ date: '2024-05-20', desktop: 177 },
	{ date: '2024-05-21', desktop: 82 },
	{ date: '2024-05-22', desktop: 81 },
	{ date: '2024-05-23', desktop: 252 },
	{ date: '2024-05-24', desktop: 294 },
	{ date: '2024-05-25', desktop: 201 },
	{ date: '2024-05-26', desktop: 213 },
	{ date: '2024-05-27', desktop: 420 },
	{ date: '2024-05-28', desktop: 233 },
	{ date: '2024-05-29', desktop: 78 },
	{ date: '2024-05-30', desktop: 340 },
	{ date: '2024-05-31', desktop: 178 },
	{ date: '2024-06-01', desktop: 178 },
	{ date: '2024-06-02', desktop: 470 },
	{ date: '2024-06-03', desktop: 103 },
	{ date: '2024-06-04', desktop: 439 },
	{ date: '2024-06-05', desktop: 88 },
	{ date: '2024-06-06', desktop: 294 },
	{ date: '2024-06-07', desktop: 323 },
	{ date: '2024-06-08', desktop: 385 },
	{ date: '2024-06-09', desktop: 438 },
	{ date: '2024-06-10', desktop: 155 },
	{ date: '2024-06-11', desktop: 92 },
	{ date: '2024-06-12', desktop: 492 },
	{ date: '2024-06-13', desktop: 81 },
	{ date: '2024-06-14', desktop: 426 },
	{ date: '2024-06-15', desktop: 307 },
	{ date: '2024-06-16', desktop: 371 },
	{ date: '2024-06-17', desktop: 475 },
	{ date: '2024-06-18', desktop: 107 },
	{ date: '2024-06-19', desktop: 341 },
	{ date: '2024-06-20', desktop: 408 },
	{ date: '2024-06-21', desktop: 169 },
	{ date: '2024-06-22', desktop: 317 },
	{ date: '2024-06-23', desktop: 480 },
	{ date: '2024-06-24', desktop: 132 },
	{ date: '2024-06-25', desktop: 141 },
	{ date: '2024-06-26', desktop: 434 },
	{ date: '2024-06-27', desktop: 448 },
	{ date: '2024-06-28', desktop: 149 },
	{ date: '2024-06-29', desktop: 103 },
	{ date: '2024-06-30', desktop: 446 },
]

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--chart-1))',
	},
	mobile: {
		label: 'Mobile',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig

export default function ProjectStatistics() {
	const [timeRange, setTimeRange] = React.useState('90d')

	const filteredData = chartData.filter(item => {
		const date = new Date(item.date)
		const referenceDate = new Date('2024-06-30')
		let daysToSubtract = 90
		if (timeRange === '30d') {
			daysToSubtract = 30
		} else if (timeRange === '7d') {
			daysToSubtract = 7
		}
		const startDate = new Date(referenceDate)
		startDate.setDate(startDate.getDate() - daysToSubtract)
		return date >= startDate
	})
	return (
		<Card className=''>
			<CardHeader className='flex items-center gap-2 space-y-0 border-b border-gray-400 py-5 sm:flex-row'>
				<CardTitle>Area Chart - Gradient</CardTitle>
				<CardDescription>
					Showing total visitors for the last 6 months
				</CardDescription>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger
						className='w-[160px] rounded-lg sm:ml-auto'
						aria-label='Select a value'
					>
						<SelectValue placeholder='Last 3 months' />
					</SelectTrigger>
					<SelectContent className='rounded-xl'>
						<SelectItem value='90d' className='rounded-lg'>
							Last 3 months
						</SelectItem>
						<SelectItem value='30d' className='rounded-lg'>
							Last 30 days
						</SelectItem>
						<SelectItem value='7d' className='rounded-lg'>
							Last 7 days
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart accessibilityLayer data={filteredData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={value => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<defs>
							<linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
								<stop
									offset='5%'
									stopColor='var(--color-desktop)'
									stopOpacity={0.8}
								/>
								<stop
									offset='95%'
									stopColor='var(--color-desktop)'
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient id='fillMobile' x1='0' y1='0' x2='0' y2='1'>
								<stop
									offset='5%'
									stopColor='var(--color-mobile)'
									stopOpacity={0.8}
								/>
								<stop
									offset='95%'
									stopColor='var(--color-mobile)'
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<Area
							dataKey='desktop'
							type='natural'
							fill='url(#fillDesktop)'
							fillOpacity={0.4}
							stroke='var(--color-desktop)'
							stackId='a'
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className='flex w-full items-start gap-2 text-sm'>
					<div className='grid gap-2'>
						<div className='flex items-center gap-2 font-medium leading-none'>
							Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
						</div>
						<div className='flex items-center gap-2 leading-none text-muted-foreground'>
							January - June 2024
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}

//  Apex-Chart line graph. it can be used
// const ProjectStatistics = () => {
// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// 	const options = {
// 		// add data series via arrays, learn more here: https://apexcharts.com/docs/series/
// 		series: [
// 			{
// 				name: 'Nodes',
// 				data: [100, 250, 500, 740, 1200],
// 				color: '#7E3BF2',
// 			},
// 			{
// 				name: 'Gateways',
// 				data: [20, 28, 34, 54, 100],
// 				color: '#1A56DB',
// 			},
// 		],
// 		chart: {
// 			height: '250px',
// 			maxWidth: '100%',
// 			type: 'area',
// 			fontFamily: 'Inter, sans-serif',
// 			dropShadow: {
// 				enabled: false,
// 			},
// 			toolbar: {
// 				show: false,
// 			},
// 		},
// 		tooltip: {
// 			enabled: true,
// 			x: {
// 				show: false,
// 			},
// 		},
// 		legend: {
// 			show: false,
// 		},
// 		fill: {
// 			type: 'gradient',
// 			gradient: {
// 				opacityFrom: 0.55,
// 				opacityTo: 0,
// 				shade: '#1C64F2',
// 				gradientToColors: ['#1C64F2'],
// 			},
// 		},
// 		dataLabels: {
// 			enabled: false,
// 		},
// 		stroke: {
// 			width: 1,
// 		},
// 		grid: {
// 			show: true,
// 			strokeDashArray: 4,
// 			padding: {
// 				left: 2,
// 				right: 2,
// 				top: 0,
// 			},
// 		},
// 		xaxis: {
// 			categories: [
// 				'2021',
// 				'2022',
// 				'2023',
// 				'2024',
// 				// '2025',
// 			],
// 			labels: {
// 				show: true,
// 				rotate: 0, // Ensures labels are horizontal
// 				hideOverlappingLabels: false,
// 				style: {
// 					fontSize: '10px', // Reduce font size
// 				},
// 			},
// 			axisBorder: {
// 				show: true,
// 			},
// 			axisTicks: {
// 				show: true,
// 			},
// 		},
// 		yaxis: {
// 			show: true,
// 			labels: {
// 				formatter: function (value: unknown) {
// 					return '+' + value
// 				},
// 			},
// 		},
// 	}

// 	const chartRef = useRef(null)

// 	useEffect(() => {
// 		if (chartRef.current && typeof ApexCharts !== 'undefined') {
// 			const chart = new ApexCharts(chartRef.current, options)
// 			chart.render()

// 			return () => {
// 				chart.destroy() // Destroy the chart instance when the component unmounts
// 			}
// 		}
// 	}, [options])
// 	return (
// 		<div>
// 			<div className='w-full shadow-[0px_0px_10px_5px_rgba(0,_0,_0,_0.1)] rounded-xl p-4 md:p-6'>
// 				<div className='flex justify-between'>
// 					<div>
// 						<h5 className='leading-none md:text-2xl font-bold text-gray-700 pb-2'>
// 							스마트가드 전체 현황{' '}
// 						</h5>
// 					</div>
// 					<div className='flex items-center px-2.5 py-0.5 md:text-base font-semibold text-green-500 dark:text-green-500 text-center'>
// 						23%
// 						<svg
// 							className='w-3 h-8 ms-1'
// 							aria-hidden='true'
// 							xmlns='http://www.w3.org/2000/svg'
// 							fill='none'
// 							viewBox='0 0 10 14'
// 						>
// 							<path
// 								stroke='currentColor'
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth='2'
// 								d='M5 13V1m0 0L1 5m4-4 4 4'
// 							/>
// 						</svg>
// 					</div>
// 				</div>
// 				<div ref={chartRef} id='data-series-chart'></div>
// 			</div>
// 		</div>
// 	)
// }

// export default ProjectStatistics
