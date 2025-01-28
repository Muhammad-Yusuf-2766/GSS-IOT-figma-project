import { getGateways } from '@/services/apiRequests'
import { useGatewaysListState } from '@/stores/gatewaysListStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const tHead = ['No.', '게이트웨이 No.', '노드', '상태', '상태 변경', '삭제']

const GatewaysList = () => {
	const { gateways, setGateways } = useGatewaysListState()

	const { isLoading, error, data } = useQuery({
		queryKey: ['get-users'],
		queryFn: getGateways,
		enabled: !gateways || gateways.length === 0, // bu muhim!!!: users mavjud bo'lganda qayta so'rov yubormaydi.
		retry: 1,
	})

	useEffect(() => {
		if (data?.gateways) {
			setGateways(data.gateways)
		}
	}, [data, setGateways])

	return (
		<div className='max-h-[550px] overflow-y-auto bg-white'>
			<table className='w-full text-sm text-center text-gray-500  rounded-md'>
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
					{gateways.map((gateway, index) => (
						<tr
							key={gateway._id}
							className='border-2 border-gray-400 hover:bg-gray-100'
						>
							<td className='md:w-5 md:px-2 md:py-2 border-x-2 border-gray-400 text-center text-gray-900'>
								{index + 1}
							</td>
							<td className='md:px-2 md:py-2 text-gray-900 whitespace-nowrap'>
								{gateway.serial_number}
							</td>
							<td className='md:px-2 md:py-2 border-x-2 border-gray-400 text-center'>
								{gateway.nodes.length}
							</td>
							<td className='md:px-2 md:py-2 border-x-2 border-gray-400'>
								<div
									className={`md:w-5 md:h-5 w-2 h-2 rounded-full ${
										gateway.product_status ? 'bg-red-500' : 'bg-green-400'
									} mx-auto`}
								/>
							</td>

							<td className='md:px-2 md:py-2 border-x-2 border-gray-400 text-center text-sm'>
								<button className='border py-1 px-2 rounded-md bg-blue-800 text-white hover:bg-blue-900'>
									변경
								</button>
							</td>

							<td className='md:px-2 md:py-2 border-x-2 border-gray-400 text-center text-sm'>
								<button className='border py-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-600'>
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
