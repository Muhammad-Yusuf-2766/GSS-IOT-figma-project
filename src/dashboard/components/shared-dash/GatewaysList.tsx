/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { useGatewaysList } from '@/hooks/useProducts'
import { deleteProduct, updateProductStatus } from '@/services/apiRequests'
import { IUpdateProductStatus } from '@/types/interfaces'
import React, { useState } from 'react'
import { toast } from 'sonner'

const tHead = ['게이트웨이 No.', '노드', '상태', '상태 변경', '삭제']

const GatewaysList = () => {
	const { data, refetch } = useGatewaysList()
	const [expandedRow, setExpandedRow] = useState<string | null>(null)

	const handleStatus = async (updatingData: IUpdateProductStatus) => {
		try {
			await updateProductStatus(updatingData)
			toast.success('성공, 게이트웨이 상태가 바꼈읍니다!')
			refetch()
		} catch (error: any) {
			toast.error(error.message || 'Error on updating gateway status')
		}
	}

	const handleDelete = async (deletingProduct: IUpdateProductStatus) => {
		try {
			await deleteProduct(deletingProduct)
			toast.success('성공, 게이트웨이가 삭제 하였읍니다!')
			refetch()
		} catch (error: any) {
			toast.error(error.message || 'Error on deleting gateway')
		}
	}

	console.log(data)

	const sortedGateways = data?.sort(
		(a, b) => parseInt(a.serial_number, 10) - parseInt(b.serial_number, 10)
	)

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
							게이트웨이 정보
						</th>
					</tr>
				</thead>
				<tbody className='text-center text-sm'>
					{sortedGateways &&
						sortedGateways.length > 0 &&
						sortedGateways.map(gateway => (
							<React.Fragment key={gateway._id}>
								<tr
									key={gateway._id}
									className='border border-gray-400 hover:bg-gray-100'
								>
									<td className='md:px-2 md:py-2 text-gray-900 whitespace-nowrap hidden md:table-cell'>
										{gateway.serial_number}
									</td>
									<td className='md:px-2 md:py-2 border-x border-gray-400 text-center hidden md:table-cell'>
										{gateway.nodes.length}
									</td>
									<td className='md:px-2 md:py-2 border-x border-gray-400 hidden md:table-cell'>
										<div
											className={`md:w-5 md:h-5 w-2 h-2 rounded-full ${
												gateway.gateway_status ? 'bg-red-500' : 'bg-green-400'
											} mx-auto`}
										/>
									</td>
									<td className='md:px-2 md:py-2 border-x-1 border-gray-400 text-center text-sm hidden md:table-cell'>
										<Button
											onClick={() =>
												handleStatus({
													product_type: 'GATEWAY',
													product_endpoint: '/update-product',
													product_id: gateway._id,
												})
											}
											variant='default'
											size='sm'
										>
											변경
										</Button>
									</td>
									<td className='md:px-2 md:py-2 border-x border-gray-400 text-center text-sm hidden md:table-cell'>
										<Button
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
											variant='destructive'
											size='sm'
										>
											삭제
										</Button>
									</td>
									<td className='px-4 py-2 md:hidden'>
										<div className='flex items-center justify-between'>
											<span className='font-medium text-gray-900 mr-2'>
												게이트웨이 {gateway.serial_number}
											</span>
											<Button
												onClick={() =>
													setExpandedRow(
														expandedRow === gateway._id ? null : gateway._id
													)
												}
												variant='outline'
												size='sm'
											>
												{expandedRow === gateway._id ? '접기' : '펼치기'}
											</Button>
										</div>
									</td>
								</tr>
								{expandedRow === gateway._id && (
									<tr className='md:hidden'>
										<td colSpan={tHead.length}>
											<div className='px-4 py-2 space-y-2'>
												<p>
													<strong>노드 수:</strong> {gateway.nodes.length}
												</p>
												<p>
													<strong>
														상태: {gateway.gateway_status ? '재고고' : '사용중'}
													</strong>{' '}
													<span
														className={`inline-block w-3 h-3 rounded-full ${
															gateway.gateway_status
																? 'bg-red-500'
																: 'bg-green-400'
														}`}
													/>
												</p>
												<div className='space-y-2'>
													<Button
														onClick={() =>
															handleStatus({
																product_type: 'GATEWAY',
																product_endpoint: '/update-product',
																product_id: gateway._id,
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
																`${gateway.serial_number} 번 게이트웨이를를 삭제 하시겠습니까 ?`
															) &&
															handleDelete({
																product_type: 'GATEWAY',
																product_endpoint: '/delete-product',
																product_id: gateway._id,
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
						))}
				</tbody>
			</table>
		</div>
	)
}

export default GatewaysList
