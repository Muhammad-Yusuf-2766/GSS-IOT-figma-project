import { INode } from '@/types/interfaces'
import { IoCheckmarkSharp } from 'react-icons/io5'

interface INodeProps {
	nodes?: INode[] | []
}

const ActiveNodes = ({ nodes }: INodeProps) => {
	return (
		<div className='flex justify-center items-center flex-col'>
			<h1 className='leading-none text-xl font-bold text-gray-700 underline underline-offset-4'>
				작동 노드 현황
			</h1>
			<div className='w-[200px] h-[540px] overflow-y-auto border m-5 sm:rounded-lg'>
				<div className='max-h-[620px]'>
					{/* Set max height as needed */}
					<table className='w-full text-sm text-center text-gray-500'>
						<thead className='text-gray-700 text-xs uppercase bg-gray-300 '>
							<tr className=''>
								<th scope='col' className='px-4 py-3'>
									노드 No.
								</th>
								<th scope='col' className='px-4 py-3 border-l border-gray-400'>
									노드 상태:
								</th>
							</tr>
						</thead>
						<tbody className='text-center'>
							{nodes && nodes.length > 0 ? (
								nodes.map(node => (
									<tr key={node._id} className='border-b'>
										<th
											scope='row'
											className='px-4 py-3 font-medium text-gray-900 border-r'
										>
											{node.doorNum}
										</th>
										<td className='px-4 py-3 text-center'>
											{<IoCheckmarkSharp size={25} color='green' />}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={6} className='text-center py-4 text-gray-500'>
										<p>다 노드가 사용중, 새로운 노드를 생성하세요</p>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default ActiveNodes
