import { INode } from '@/types/interfaces'

const tHead = [
	'No.',
	'노드 No.',
	'문 상태',
	'배터리 상태',
	'모드 상태',
	'위치',
	'상태 변경',
	'삭제',
]

interface IProps {
	nodes: INode[]
	updateNode?: () => void
	deleteNode?: () => void
}

const NodesList = ({ nodes }: IProps) => {
	if (!Array.isArray(nodes) || nodes.length === 0) {
		return (
			<div className='text-center text-gray-700 py-10'>
				<h1 className='text-xl font-bold'>사용불가 ( 노드 )</h1>
			</div>
		)
	}

	return (
		// <div className='overflow-y-auto shadow-md shadow-slate-500 bg-white m-5 sm:rounded-lg mt-10'>
		<div className='max-h-[550px] overflow-y-auto bg-white'>
			{/* Set max height as needed */}
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
					{nodes.map((node, index) => (
						<tr
							key={node._id}
							className='border-2 border-gray-400 hover:bg-gray-100'
						>
							<td className='md:w-5 md:px-4 md:py-3 border-x-2 border-gray-400 text-center text-gray-900'>
								{index + 1}
							</td>
							<td
								// scope='row'
								className='md:px-4 md:py-3 whitespace-nowrap'
							>
								{node.doorNum}
							</td>
							<td className='md:px-4 md:py-3 border-x-2 border-gray-400 text-center'>
								{node.doorChk}
							</td>
							<td className='md:px-4 md:py-3 border-x-2 border-gray-400 text-center'>
								{node.betChk}
							</td>

							<td className='md:px-4 md:py-3 border-x-2 border-gray-400'>
								<div
									className={`md:w-5 md:h-5 w-2 h-2 rounded-full ${
										!node.product_status ? 'bg-green-400' : 'bg-red-500'
									} mx-auto animate-pulse`}
								/>
							</td>
							<td className='md:px-4 md:py-3 border-x-2 border-gray-400 text-center'>
								{node.position}
							</td>

							<td className='md:px-4 md:py-3 border-x-2 border-gray-400 text-center'>
								<button
									// onClick={() => updateNode(node._id)}
									className='border md:py-2 md:px-4 px-2 py-1 rounded-md bg-blue-800 text-white hover:bg-indigo-600'
								>
									변경
								</button>
							</td>
							{/* whitespace-nowrap css style bu matnni 2 ga bo'linmasligi uchun */}
							<td className='md:px-4 md:py-3 border-x-2 border-gray-400 text-center text-sm'>
								<button className='border md:py-2 md:px-4 px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 whitespace-nowrap'>
									삭제
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
		// </div>
	)
}

export default NodesList
