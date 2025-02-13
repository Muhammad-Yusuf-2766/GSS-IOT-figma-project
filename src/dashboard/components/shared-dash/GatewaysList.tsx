import { useGatewaysList } from '@/hooks/useProducts'
import { deleteProduct, updateProductStatus } from '@/services/apiRequests'
import { IUpdateProductStatus } from '@/types/interfaces'
import { toast } from 'sonner'

const tHead = ['게이트웨이 No.', '노드', '상태', '상태 변경', '삭제']

// interface IGatewayProps {
// 	gateways?: IGateway[] | []
// }

const GatewaysList = () => {
	const { data, refetch } = useGatewaysList()

	const handleStatus = async (updatingData: IUpdateProductStatus) => {
		await updateProductStatus(updatingData)
			.then(() => {
				toast.success('성공, 게이트웨이 상태가 바꼈읍니다!')
				refetch()
			})
			.catch(error => {
				toast.error(error.message || 'Error on deleting-gateway')
			})
	}

	const handleDelete = async (deletingProduct: IUpdateProductStatus) => {
		await deleteProduct(deletingProduct)
			.then(() => {
				toast.success('성공, 게이트웨이가 삭제 하였읍니다!')
				refetch()
			})
			.catch(error => {
				toast.error(error.message || 'Error on deleting-gateway')
			})
	}

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
					{data &&
						data.length > 0 &&
						data.map(gateway => (
							<tr
								key={gateway._id}
								className='border-2 border-gray-400 hover:bg-gray-100'
							>
								<td className='md:px-2 md:py-2 text-gray-900 whitespace-nowrap'>
									{gateway.serial_number}
								</td>
								<td className='md:px-2 md:py-2 border-x-2 border-gray-400 text-center'>
									{gateway.nodes.length}
								</td>
								<td className='md:px-2 md:py-2 border-x-2 border-gray-400'>
									<div
										className={`md:w-5 md:h-5 w-2 h-2 rounded-full ${
											gateway.gateway_status ? 'bg-red-500' : 'bg-green-400'
										} mx-auto`}
									/>
								</td>

								<td className='md:px-2 md:py-2 border-x-2 border-gray-400 text-center text-sm'>
									<button
										onClick={() =>
											handleStatus({
												product_type: 'GATEWAY',
												product_endpoint: '/update-product',
												product_id: gateway._id,
											})
										}
										className='border py-1 px-2 rounded-md bg-blue-800 text-white hover:bg-blue-900'
									>
										변경
									</button>
								</td>

								<td className='md:px-2 md:py-2 border-x-2 border-gray-400 text-center text-sm'>
									<button
										onClick={() =>
											confirm(
												`${gateway.serial_number} 번 게이트웨이를를 삭제 하시겠습니까 ?`
											) &&
											handleDelete({
												product_type: 'GATEWAY',
												product_endpoint: '/delete-product',
												product_id: gateway._id,
											})
										}
										className='border py-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-600'
									>
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
