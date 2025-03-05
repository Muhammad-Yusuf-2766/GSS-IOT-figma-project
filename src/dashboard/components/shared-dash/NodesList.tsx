/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { useNodesList } from '@/hooks/useProducts'
import { deleteProduct, updateProductStatus } from '@/services/apiRequests'
import { IUpdateProductStatus } from '@/types/interfaces'
import React, { useState } from 'react'
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

const NodesList = () => {
	const { data, refetch } = useNodesList()
	const [expandedRow, setExpandedRow] = useState<string | null>(null)

	const handleProductStatus = async (updatingData: IUpdateProductStatus) => {
		try {
			await updateProductStatus(updatingData)
			toast.success('성공, 노드 상태가 바꼈읍니다!')
			refetch()
		} catch (error: any) {
			toast.error(error.message || 'Error on updating node status')
		}
	}

	const handleDelete = async (deletingProduct: IUpdateProductStatus) => {
		try {
			await deleteProduct(deletingProduct)
			toast.success('성공, 노드가 삭제 하였읍니다!')
			refetch()
		} catch (error: any) {
			toast.error(error.message || 'Error on deleting node status')
		}
	}

	const sortedNodes = data?.sort((a, b) => a.doorNum - b.doorNum)

	return (
		<div className='max-h-[calc(100vh-200px)] overflow-y-auto bg-white'>
			<table className='w-full text-sm text-center text-gray-500 rounded-md'>
				<thead className='text-gray-700 text-xs uppercase bg-gray-300 border-gray-400 sticky top-0'>
					<tr>
						{tHead.map(head => (
							<th
								key={head}
								scope='col'
								className='md:px-4 md:py-3 py-2 border-x border-gray-400 hidden md:table-cell'
							>
								{head}
							</th>
						))}
						<th
							scope='col'
							className='md:hidden px-4 py-3 border-x border-gray-400'
						>
							노드 정보
						</th>
					</tr>
				</thead>
				<tbody className='text-center'>
					{sortedNodes && sortedNodes.length > 0 ? (
						sortedNodes.map(node => (
							<React.Fragment key={node._id}>
								<tr
									key={node._id}
									className='border border-gray-400 hover:bg-gray-100'
								>
									<td className='md:px-4 md:py-2 whitespace-nowrap hidden md:table-cell'>
										{node.doorNum}
									</td>
									<td className='md:px-4 md:py-2 border-x border-gray-400 text-center hidden md:table-cell'>
										{node.doorChk}
									</td>
									<td className='md:px-4 md:py-2 border-x border-gray-400 text-center hidden md:table-cell'>
										{node.betChk}
									</td>
									<td className='md:px-4 md:py-2 border-x border-gray-400 hidden md:table-cell'>
										<div
											className={`md:w-5 md:h-5 w-2 h-2 rounded-full ${
												!node.node_status ? 'bg-green-400' : 'bg-red-500'
											} mx-auto animate-pulse`}
										/>
									</td>
									<td className='md:px-4 md:py-2 border-x border-gray-400 text-center hidden md:table-cell'>
										{node.position}
									</td>
									<td className='md:px-4 md:py-2 border-x border-gray-400 text-center hidden md:table-cell'>
										<Button
											onClick={() =>
												handleProductStatus({
													product_type: 'NODE',
													product_endpoint: '/update-product',
													product_id: node._id,
												})
											}
											variant='default'
											size='sm'
										>
											변경
										</Button>
									</td>
									<td className='md:px-4 md:py-2 border-x border-gray-400 text-center text-sm hidden md:table-cell'>
										<Button
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
											variant='destructive'
											size='sm'
										>
											삭제
										</Button>
									</td>
									<td className='px-4 py-2 md:hidden'>
										<div className='flex items-center justify-between'>
											<span className='font-medium text-gray-900 mr-2'>
												문 {node.doorNum}
											</span>
											<Button
												onClick={() =>
													setExpandedRow(
														expandedRow === node._id ? null : node._id
													)
												}
												variant='outline'
												size='sm'
											>
												{expandedRow === node._id ? '접기' : '펼치기'}
											</Button>
										</div>
									</td>
								</tr>
								{expandedRow === node._id && (
									<tr className='md:hidden'>
										<td colSpan={tHead.length}>
											<div className='px-4 py-2 space-y-2'>
												<p>
													<strong>문 상태:</strong> {node.doorChk}
												</p>
												<p>
													<strong>배터리:</strong> {node.betChk}
												</p>
												<p>
													<strong>
														상태:{node.node_status ? '재고' : '사용중'}
													</strong>{' '}
													<span
														className={`inline-block w-3 h-3 rounded-full ${
															!node.node_status ? 'bg-green-400' : 'bg-red-500'
														} animate-pulse`}
													/>
												</p>
												<p>
													<strong>위치:</strong> {node.position}
												</p>
												<div className='space-y-2'>
													<Button
														onClick={() =>
															handleProductStatus({
																product_type: 'NODE',
																product_endpoint: '/update-product',
																product_id: node._id,
															})
														}
														variant='default'
														className='w-full'
													>
														상태 변경
													</Button>
													<Button
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
														variant='destructive'
														className='w-full'
													>
														삭제
													</Button>
												</div>
											</div>
										</td>
									</tr>
								)}
							</React.Fragment>
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
