import { ActiveClients } from '@/constants'
import { calculateDaysUntilExpiry } from '@/dashboard/functions/calculateDate'
import { Link } from 'react-router-dom'

const ActiveClientsList = () => {
	return (
		<div className='md:text-2xl text-lg'>
			<h1 className='leading-none font-bold text-gray-700 pb-2 m-2'>
				실시간 클라이언트
			</h1>
			<div className='relative shadow-md overflow-x-auto'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-300'>
						<tr>
							<th scope='col' className='px-4 py-3'>
								기업명:
							</th>
							<th scope='col' className='px-2 py-3'>
								건물 수:
							</th>
							<th scope='col' className='px-2 py-3'>
								담당자:
							</th>
							<th scope='col' className='px-2 py-3'>
								임대일:
							</th>
							<th scope='col' className='px-2 py-3'>
								만료일:
							</th>
							<th scope='col' className='px-2 py-3'>
								잔여일:
							</th>
						</tr>
					</thead>
					<tbody>
						{ActiveClients && ActiveClients.length > 0 ? (
							ActiveClients.slice(0, 8).map((client, index) => {
								const daysRemaining = calculateDaysUntilExpiry(
									client.expiry_date
								)
								const daysRemainingStyle =
									daysRemaining < 20 ? 'bg-red-400 text-white' : ''
								return (
									<tr
										key={index}
										className='bg-white border-b hover:bg-gray-100'
									>
										<th
											scope='row'
											className='px-4 py-1 font-medium text-gray-900 whitespace-nowrap'
										>
											{client.client_company}
										</th>
										<td className='px-2 py-4'>{client.number_of_buildings}</td>
										<td className='px-2 py-4'>
											{client.client_users?.user1_boss || 'N/A'}
										</td>
										<td className='px-2 py-4'>{client.permit_date}</td>
										<td className='px-2 py-4'>{client.expiry_date}</td>
										<td className={`px-2 py-2 ${daysRemainingStyle}`}>
											{daysRemaining}
										</td>
									</tr>
								)
							})
						) : (
							<tr>
								<td colSpan={6} className='text-center py-4 text-gray-500'>
									There is no data available.
								</td>
							</tr>
						)}
					</tbody>
				</table>
				<div className='flex justify-center items-center py-5 bg-white'>
					<Link
						to={'active-clients'}
						className='text-gray-700 font-bold text-xl hover:underline'
					>
						전체보기
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ActiveClientsList
