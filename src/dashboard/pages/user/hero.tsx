import ProjectStatistics from '@/dashboard/components/const/chartgraph'
import MetricCard from '@/dashboard/components/const/roundchart'
import ActiveClientsList from '@/dashboard/components/shared-dash/activeClients'
import { User2 } from 'lucide-react'
import { ClientHeader } from './buildingNodes'

const ClientMainPage = () => {
	return (
		<div className='w-full h-full grid grid-cols-1 md:flex flex-col gap-y-5 py-5 md:ml-4 md:text-xl text-lg'>
			<ClientHeader />
			{/* 1-div - Responsive */}
			<div className='w-full flex flex-col lg:flex-row gap-5'>
				<div className='w-full lg:w-1/2 flex flex-col items-center gap-y-3 p-5 rounded-lg shadow-[0px_0px_10px_5px_rgba(0,_0,_0,_0.1)]'>
					<h1 className='font-semibold'>대시보드</h1>
					{/* cards */}
					{[1, 2, 3].map((_, index) => (
						<div
							key={index}
							className='w-full bg-blue-100/70 rounded-lg p-5 flex flex-col items-center gap-y-4'
						>
							<h2 className='flex text-lg items-center gap-2'>
								<User2 size={24} /> 방문자
							</h2>
							<div className='flex items-center gap-3'>
								<div className='p-3 lg:p-5 bg-blue-900 text-white text-lg lg:text-xl font-bold rounded-md'>
									120
								</div>
								<h2 className='text-blue-900 text-xs lg:text-sm bg-gray-400/70 rounded-full px-2 lg:px-3 py-1'>
									누적 방문자
								</h2>
							</div>
						</div>
					))}
				</div>
				<div className='w-full lg:w-1/2 mt-4 lg:mt-0 flex flex-col gap-y-2'>
					<ProjectStatistics />
				</div>
			</div>

			{/* 2-div */}
			<div className='space-y-10'>
				<MetricCard />
			</div>
			<ActiveClientsList />
		</div>
	)
}

export default ClientMainPage
