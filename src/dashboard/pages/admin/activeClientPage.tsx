import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ActiveClients } from '@/constants'
import { calculateDaysUntilExpiry } from '@/dashboard/functions/calculateDate'
import Header from '../../components/shared-dash/Header'

const ActiveClientsPage = () => {
	return (
		<div className='w-full h-full'>
			<Header />

			<div className='w-full grid grid-cols-1 max-w-7xl mx-auto'>
				<h1 className='leading-none md:text-2xl text-lg font-bold text-gray-700 my-4'>
					실시간 클라이언트
				</h1>
				<ScrollArea className='w-full md:h-[570px] h-[550px] px-4'>
					<table className='w-full text-sm text-left rtl:text-right text-gray-500'>
						<thead className='sticky top-0 bg-gray-300 text-xs text-gray-700 uppercase'>
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
								ActiveClients.map((client, index) => {
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
											<td className='px-2 py-4'>
												{client.number_of_buildings}
											</td>
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
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</div>
		</div>
	)
}

export default ActiveClientsPage
