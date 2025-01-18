import { IGateway } from '@/types/interfaces'

const tHead = ['No.', '게이트웨이 No.', '노드', '상태', '상태 변경', '삭제']

type Props = {
	allgateways: IGateway[]
}

const GatewaysList = ({ allgateways }: Props) => {
	// Tekshirish: allgateways massiv mavjudligini va bo'sh emasligini
	if (!Array.isArray(allgateways) || allgateways.length === 0) {
		return (
			<div className='text-center text-gray-700 py-10'>
				<h1 className='text-xl font-bold'>There is no Gateways available</h1>
			</div>
		)
	}

	return (
		<div className='w-full max-h-[700px] overflow-y-auto'>
			{/* Set max height as needed */}
			<table className='w-full text-sm text-center rtl:text-right text-gray-500  rounded-md'>
				<thead className='text-gray-700 text-xs uppercase bg-gray-300 border-2 border-gray-400'>
					<tr className=''>
						{tHead.map(head => (
							<th
								key={head}
								scope='col'
								className='md:px-4 md:py-3 py-2 border-x-2 border-gray-400'
							>
								{head}:
							</th>
						))}
					</tr>
				</thead>
				<tbody className='text-center text-sm'>
					{allgateways.map((gateway, index) => (
						<tr
							key={gateway._id}
							className='border-2 border-gray-400 hover:bg-gray-100'
						>
							<td className='md:w-5 md:px-4 md:py-3 border-x-2 border-gray-400 text-center text-gray-900'>
								{index + 1}
							</td>
							<td className='md:px-4 md:py-3 text-gray-900 whitespace-nowrap'>
								{gateway.serial_number}
							</td>
							<td className='md:px-4 md:py-3 border-x-2 border-gray-400 text-center'>
								{gateway.nodes.length}
							</td>
							<td className='md:px-4 md:py-3 border-x-2 border-gray-400'>
								<div
									className={`md:w-5 md:h-5 w-2 h-2 rounded-full ${
										gateway.product_status ? 'bg-red-500' : 'bg-green-400'
									} mx-auto`}
								/>
							</td>

							<td className='md:px-4 md:py-3 border-x-2 border-gray-400 text-center text-sm'>
								<button className='border md:py-2 py-1 md:px-4 px-2 rounded-md bg-blue-800 text-white hover:bg-indigo-600'>
									변경
								</button>
							</td>

							<td className='md:px-4 md:py-3 border-x-2 border-gray-400 text-center text-sm'>
								<button className='border md:py-2 py-1 md:px-4 px-2 rounded-md bg-red-500 text-white hover:bg-red-600'>
									삭제
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default GatewaysList
