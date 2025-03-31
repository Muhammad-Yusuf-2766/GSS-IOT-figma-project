import { headButtons } from '@/constants'
import ProjectStatistics from '@/dashboard/components/const/chartgraph'
import MetricCard from '@/dashboard/components/const/roundchart'
import ActiveClientsList from '@/dashboard/components/shared-dash/activeClients'
import { BarChartNode } from '@/dashboard/components/shared-dash/barChart'
import { useUserState } from '@/stores/user.auth.store'
import { Link } from 'react-router-dom'
import { ChartByDateFilters } from '../user/lineChart'

const MainPage = () => {
	const { user } = useUserState()

	return (
		<>
			<div className='w-full h-full grid grid-cols-1 md:flex flex-col gap-y-5 py-5 md:ml-4 md:text-xl text-lg'>
				{/*  HEADER  */}
				<div className='w-full flex items-center justify-between'>
					<h1 className='w-1/2 font-bold '>
						환영합니다! <br />
						GSS-GROUP 매니저-
						<span className='text-xl font-bold text-blue-800'>
							{user?.user_name}
						</span>
					</h1>
					<div className='md:w-1/2 w-full flex justify-around mx-auto text-[15px] text-blue-600'>
						{headButtons.map(({ name, icon: Icon, route }) => (
							<Link
								key={name}
								to={route}
								className='md:w-[60px] w-[60px] md:h-[60px] h-[60px] rounded-full border  border-blue-600 p-2 flex flex-col items-center justify-center cursor-pointer text-center'
							>
								<Icon className=' text-center md:text-3xl text-[25px]' />
								{/* <span className='md:block hidden'>{name}</span> */}
							</Link>
						))}
					</div>
				</div>

				{/* 1-div Line Graphe and BAR-CHART */}
				<div className='w-full h-auto flex flex-col lg:flex-row gap-x-5'>
					{/* Bar-Chart Node */}

					<BarChartNode />

					{/* Visitors Card */}
					{/* <div className='md:w-2/4 w-full flex flex-col items-center gap-y-3 p-5 rounded-lg shadow-[0px_0px_10px_5px_rgba(0,_0,_0,_0.1)]'> */}
					{/* <h1 className='font-semibold'>대시보드</h1> */}
					{/* card */}
					{/* <div className='w-full bg-blue-100/70 rounded-lg p-5 flex flex-col items-center gap-y-4'>
						<h2 className='flex text-lg'>
							<User2 size={40} /> 방문자
						</h2>
						<div className='flex items-center gap-3'>
							<div className='p-5 bg-blue-900 text-white text-xl font-bold	rounded-md'>
								120
							</div>
							<h2 className='text-blue-900 text-sm bg-gray-400/70 rounded-full px-3 py-1'>
								누적 방문자
							</h2>
						</div> */}
					{/* </div> */}
					{/* card */}
					{/* card */}
					{/* <div className='w-full bg-blue-100/70 rounded-lg p-5 flex flex-col items-center gap-y-4'>
						<h2 className='flex text-xl'>
							<User2 size={40} /> 방문자
						</h2>
						<div className='flex items-center gap-3'>
							<div className='p-5 bg-blue-900 text-white text-xl font-bold	rounded-md'>
								120
							</div>
							<h2 className='text-blue-900 text-sm bg-gray-400/70 rounded-full px-3 py-1'>
								누적 방문자
							</h2>
						</div>
					</div> */}
					{/* card */}
					{/* card */}
					{/* <div className='w-full bg-blue-100/70 rounded-lg p-5 flex flex-col items-center gap-y-4'>
						<h2 className='flex text-xl'>
							<User2 size={40} /> 방문자
						</h2>
						<div className='flex items-center gap-3'>
							<div className='p-5 bg-blue-900 text-white text-xl font-bold	rounded-md'>
								120
							</div>
							<h2 className='text-blue-900 text-sm bg-gray-400/70 rounded-full px-3 py-1'>
								누적 방문자
							</h2>
						</div>
					</div> */}
					{/* card */}
					{/* </div> */}
					<div className='md:w-[55%] h-full md:mt-0 mt-4 flex flex-col gap-y-2'>
						<ProjectStatistics />
					</div>
				</div>

				{/* 2-div */}
				<div className=''>
					<MetricCard />
				</div>
				<ChartByDateFilters />
				<ActiveClientsList />
			</div>
		</>
	)
}

export default MainPage
