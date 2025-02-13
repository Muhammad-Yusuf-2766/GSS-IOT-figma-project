import { useNodesList } from '@/hooks/useProducts'
import { deleteProduct, updateProductStatus } from '@/services/apiRequests'
import { IUpdateProductStatus } from '@/types/interfaces'
import { toast } from 'sonner'

const tHead = [
	'노드 No.',
	'문 상태',
	'배터리 상태',
	'모드 상태',
	'위치',
	'상태 변경',
	'삭제',
]

// interface IProps {
// 	nodes?: INode[] | []
// 	updateNode?: () => void
// 	deleteNode?: () => void
// }

const NodesList = () => {
	const { data, refetch } = useNodesList()

	const handleProductStatus = async (updatingData: IUpdateProductStatus) => {
		await updateProductStatus(updatingData)
			.then(() => {
				toast.success('성공, 노드 상태가 바꼈읍니다!')
				refetch()
			})
			.catch(error => {
				toast.error(error.message || 'Error on deleting-node')
			})
	}

	const handleDelete = async (deletingProduct: IUpdateProductStatus) => {
		await deleteProduct(deletingProduct)
			.then(() => {
				toast.success('성공, 노드가 삭제 하였읍니다!')
				refetch()
			})
			.catch(error => {
				toast.error(error.message || 'Error on deleting-node')
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
								{head}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='text-center'>
					{data && data.length > 0 ? (
						data.map(node => (
							<tr
								key={node._id}
								className='border-2 border-gray-400 hover:bg-gray-100'
							>
								<td className='md:px-4 md:py-2 whitespace-nowrap'>
									{node.doorNum}
								</td>
								<td className='md:px-4 md:py-2 border-x-2 border-gray-400 text-center'>
									{node.doorChk}
								</td>
								<td className='md:px-4 md:py-2 border-x-2 border-gray-400 text-center'>
									{node.betChk}
								</td>

								<td className='md:px-4 md:py-2 border-x-2 border-gray-400'>
									<div
										className={`md:w-5 md:h-5 w-2 h-2 rounded-full ${
											!node.node_status ? 'bg-green-400' : 'bg-red-500'
										} mx-auto animate-pulse`}
									/>
								</td>
								<td className='md:px-4 md:py-2 border-x-2 border-gray-400 text-center'>
									{node.position}
								</td>

								<td className='md:px-4 md:py-2 border-x-2 border-gray-400 text-center'>
									<button
										onClick={() =>
											handleProductStatus({
												product_type: 'NODE',
												product_endpoint: '/update-product',
												product_id: node._id,
											})
										}
										className='border px-2 py-1 rounded-md bg-blue-800 text-white hover:bg-blue-900'
									>
										변경
									</button>
								</td>
								{/* whitespace-nowrap css style bu matnni 2 ga bo'linmasligi uchun */}
								<td className='md:px-4 md:py-2 border-x-2 border-gray-400 text-center text-sm'>
									<button
										onClick={() =>
											confirm(
												`${node.doorNum} 번 노드를 삭제 하시겠습니까 ?`
											) &&
											handleDelete({
												product_type: 'NODE',
												product_endpoint: '/delete-product',
												product_id: node._id,
											})
										}
										className='border px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 whitespace-nowrap'
									>
										삭제
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan={tHead.length}
								className='text-center text-gray-500 py-4 text-lg'
							>
								노드들이 없읍니다 :(
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default NodesList
