import { headButtons } from '@/constants'
import ProjectStatistics from '@/dashboard/components/const/chartgraph'
import MetricCard from '@/dashboard/components/const/roundchart'
import ActiveClientsList from '@/dashboard/components/shared-dash/activeClients'
import { User2 } from 'lucide-react'
import { Link } from 'react-router-dom'
// import ProjectStatistics from '../components/const/chartgraph'
// import MetricCard from '../components/const/roundchart'
// import ActiveClientsList from '../components/shared-dash/activeClients'

const MainPage = () => {
	return (
		<>
			<div className='w-full h-full grid grid-cols-1 md:flex flex-col gap-y-5 py-5 md:ml-4 md:text-xl text-lg'>
				<h1 className='font-bold w-fit'>
					환영합니다! <br />
					GSS-GROUP 매니저-
					<span className='text-xl font-bold text-blue-700'>Yang da yeoun</span>
				</h1>
				{/* 1-div */}
				<div className='w-full flex flex-col lg:flex-row gap-x-5'>
					<div className='md:w-2/4 w-full flex flex-col items-center gap-y-3 p-5 rounded-lg shadow-[0px_0px_10px_5px_rgba(0,_0,_0,_0.1)]'>
						<h1 className='font-semibold'>대시보드</h1>
						{/* card */}
						<div className='w-full bg-blue-100/70 rounded-lg p-5 flex flex-col items-center gap-y-4'>
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
							</div>
						</div>
						{/* card */}
						{/* card */}
						<div className='w-full bg-blue-100/70 rounded-lg p-5 flex flex-col items-center gap-y-4'>
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
						</div>
						{/* card */}
						{/* card */}
						<div className='w-full bg-blue-100/70 rounded-lg p-5 flex flex-col items-center gap-y-4'>
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
						</div>
						{/* card */}
					</div>
					<div className='md:w-full md:mt-0 mt-4 flex flex-col gap-y-2'>
						<div className='md:w-2/3 w-full flex justify-around mx-auto text-[15px] text-blue-600'>
							{headButtons.map(({ name, icon: Icon, route }) => (
								<Link
									key={name}
									to={route}
									className='md:w-[100px] w-[60px] md:h-[100px] h-[60px] rounded-full border  border-blue-600 p-2 flex flex-col items-center justify-center cursor-pointer text-center'
								>
									<Icon className=' text-center md:text-2xl text-[25px]' />
									<span className='md:block hidden'>{name}</span>
								</Link>
							))}
						</div>
						<ProjectStatistics />
					</div>
				</div>

				{/* 2-div */}
				<div className='space-y-10'>
					<MetricCard />
				</div>
				<ActiveClientsList />
			</div>
		</>
	)
}

export default MainPage
