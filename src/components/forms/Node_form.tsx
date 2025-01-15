import { useState } from 'react'

const NodeForm = () => {
	const [nodeData, setNodeData] = useState({
		startNode: '',
		endNode: '',
		doorChk: 0,
		product_status: true,
	})

	return (
		<div className='md:w-[30%] flex flex-col justify-center items-center md:text-lg text-sm text-gray-500'>
			<h1 className='leading-none text-xl font-bold text-gray-700 pb-2 mb-5 underline underline-offset-4'>
				노드 생성
			</h1>
			<form
				// onSubmit={handleSubmit}
				className='w-full h-[400px] flex flex-col justify-around items-center p-4 border bg-white rounded-lg shadow-lg shadow-gray-300'
			>
				<h4 className='text-center capitalize mb-4'>스마트가드 노드 No.</h4>
				<div className='w-full mb-4'>
					<label className='block mb-2'>노드-시작:</label>
					<input
						type='number'
						name='startNode'
						// value={nodeData.startNode}
						// onChange={handleInputChange}
						className='w-full outline outline-1 outline-blue-500 px-3 py-2 border border-gray-300 rounded-md'
						required
					/>
				</div>

				<div className='w-full mb-4'>
					<label className='block mb-2'>노드-끝:</label>
					<input
						type='number'
						name='endNode'
						// value={nodeData.endNode}
						// onChange={handleInputChange}
						className='w-full outline outline-1 outline-blue-500 px-3 py-2 border border-gray-300 rounded-md'
						required
					/>
				</div>

				<button
					type='submit'
					className='w-full text-center flex items-center justify-center text-white bg-blue-600 shadow-md shadow-gray-50 hover:shadow-gray-400 font-medium rounded-lg text-sm px-5 py-3 me-2'
				>
					노드 생성
				</button>
			</form>
		</div>
	)
}

export default NodeForm
