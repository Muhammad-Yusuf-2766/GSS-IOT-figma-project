import { ActiveClients } from '@/constants'
import { calculateDaysUntilExpiry } from '@/dashboard/functions/calculateDate'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useState } from 'react'

const ActiveClientsList = () => {
	const [expandedRows, setExpandedRows] = useState<number[]>([])

	const toggleRow = (index: number) => {
		setExpandedRows(prev =>
			prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
		)
	}

	return (
		<div className='md:text-2xl text-lg md:ml-4'>
			<h1 className='leading-none font-bold text-gray-700 pb-2 m-2'>
				실시간 클라이언트
			</h1>
			<div className='relative shadow-md overflow-x-auto'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-300 hidden md:table-header-group'>
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
								const isExpanded = expandedRows.includes(index)

								return (
									<tr
										key={index}
										className='bg-white border-b hover:bg-gray-100 md:table-row flex flex-col'
									>
										<td
											className='md:hidden px-4 py-2 font-medium text-gray-900 flex justify-between items-center cursor-pointer'
											onClick={() => toggleRow(index)}
										>
											{client.client_company}
											{isExpanded ? (
												<ChevronUpIcon className='h-5 w-5' />
											) : (
												<ChevronDownIcon className='h-5 w-5' />
											)}
										</td>
										<td className='md:table-cell hidden px-4 py-2 font-medium text-gray-900'>
											{client.client_company}
										</td>
										<td
											className={`md:table-cell ${
												isExpanded ? '' : 'hidden'
											} px-2 py-2`}
										>
											<span className='md:hidden font-medium'>건물 수: </span>
											{client.number_of_buildings}
										</td>
										<td
											className={`md:table-cell ${
												isExpanded ? '' : 'hidden'
											} px-2 py-2`}
										>
											<span className='md:hidden font-medium'>담당자: </span>
											{client.client_users?.user1_boss || 'N/A'}
										</td>
										<td
											className={`md:table-cell ${
												isExpanded ? '' : 'hidden'
											} px-2 py-2`}
										>
											<span className='md:hidden font-medium'>임대일: </span>
											{client.permit_date}
										</td>
										<td
											className={`md:table-cell ${
												isExpanded ? '' : 'hidden'
											} px-2 py-2`}
										>
											<span className='md:hidden font-medium'>만료일: </span>
											{client.expiry_date}
										</td>
										<td
											className={`md:table-cell ${
												isExpanded ? '' : 'hidden'
											} px-2 py-2 ${daysRemainingStyle}`}
										>
											<span className='md:hidden font-medium'>잔여일: </span>
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
			</div>
		</div>
	)
}

export default ActiveClientsList
