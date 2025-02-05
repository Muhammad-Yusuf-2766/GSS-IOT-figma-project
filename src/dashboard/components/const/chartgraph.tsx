import ApexCharts from 'apexcharts'
import { useEffect, useRef } from 'react'

const ProjectStatistics = () => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const options = {
		// add data series via arrays, learn more here: https://apexcharts.com/docs/series/
		series: [
			{
				name: 'Nodes',
				data: [100, 250, 500, 740, 1200],
				color: '#7E3BF2',
			},
			{
				name: 'Gateways',
				data: [20, 28, 34, 54, 100],
				color: '#1A56DB',
			},
		],
		chart: {
			height: '390px',
			maxWidth: '100%',
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			dropShadow: {
				enabled: false,
			},
			toolbar: {
				show: false,
			},
		},
		tooltip: {
			enabled: true,
			x: {
				show: false,
			},
		},
		legend: {
			show: false,
		},
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.55,
				opacityTo: 0,
				shade: '#1C64F2',
				gradientToColors: ['#1C64F2'],
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			width: 1,
		},
		grid: {
			show: true,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: 0,
			},
		},
		xaxis: {
			categories: [
				'2021',
				'2022',
				'2023',
				'2024',
				// '2025',
			],
			labels: {
				show: true,
				rotate: 0, // Ensures labels are horizontal
				hideOverlappingLabels: false,
				style: {
					fontSize: '10px', // Reduce font size
				},
			},
			axisBorder: {
				show: true,
			},
			axisTicks: {
				show: true,
			},
		},
		yaxis: {
			show: true,
			labels: {
				formatter: function (value: unknown) {
					return '+' + value
				},
			},
		},
	}

	const chartRef = useRef(null)

	useEffect(() => {
		if (chartRef.current && typeof ApexCharts !== 'undefined') {
			const chart = new ApexCharts(chartRef.current, options)
			chart.render()

			return () => {
				chart.destroy() // Destroy the chart instance when the component unmounts
			}
		}
	}, [options])
	return (
		<div>
			<div className='w-full  shadow-[0px_0px_10px_5px_rgba(0,_0,_0,_0.1)] rounded-xl p-4 md:p-6'>
				<div className='flex justify-between'>
					<div>
						<h5 className='leading-none md:text-2xl font-bold text-gray-700 pb-2'>
							스마트가드 전체 현황{' '}
						</h5>
					</div>
					<div className='flex items-center px-2.5 py-0.5 md:text-base font-semibold text-green-500 dark:text-green-500 text-center'>
						23%
						<svg
							className='w-3 h-8 ms-1'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 10 14'
						>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M5 13V1m0 0L1 5m4-4 4 4'
							/>
						</svg>
					</div>
				</div>
				<div ref={chartRef} id='data-series-chart'></div>
			</div>
		</div>
	)
}

export default ProjectStatistics
