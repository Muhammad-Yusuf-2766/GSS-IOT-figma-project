import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { INode } from '@/types/interfaces'
import { useRef, useState } from 'react'
import { HiMiniSquares2X2 } from 'react-icons/hi2'

interface IProps {
	nodes: INode[]
	onFilterChange: (filterOpenDoors: boolean) => void // Callback
}

const TotalcntCsv = ({ nodes, onFilterChange }: IProps) => {
	// const [fileData, setFileData] = useState([])
	const fileInputRef = useRef(null) // Fayl input uchun ref
	const [filterOpenDoors, setFilterOpenDoors] = useState(false)

	const handleCheckboxChange = (isChecked: boolean) => {
		setFilterOpenDoors(isChecked)
		onFilterChange(isChecked) // Callback funksiyasini chaqirish
	}

	if ((nodes?.length ?? 0) <= 0) {
		return (
			<h1 className='w-full h-full flex justify-center mt-10 text-red-600 text-lg'>
				이 건물의 노드를 못 찾았습니다 :(
			</h1>
		)
	}

	return (
		<div className='w-full'>
			<div className='w-full md:px-6 px-2 py-3 flex items-center justify-between gap-2 bg-blue-900 text-white mx-auto text-sm'>
				<div className='flex items-center gap-3'>
					<HiMiniSquares2X2 className='md:text-[30px] text-[20px]' />
					<span>총 노드 수: {nodes.length}</span>
				</div>

				<div
					className={`px-2 flex items-center ${cn(
						nodes.filter(node => node.doorChk === 1).length > 0
							? 'text-red-500 gap-2'
							: ''
					)} gap-2`}
				>
					<div className='md:w-5 md:h-5 w-3 h-3 rounded-full bg-red-500 mx-auto animate-pulse' />
					열림 문 수: {''}
					{nodes.filter(node => node.doorChk === 1).length}
				</div>

				<div className='flex justify-center items-center gap-3'>
					<Checkbox
						id='terms'
						checked={filterOpenDoors}
						onCheckedChange={handleCheckboxChange}
						className='border-secondary'
					/>
					<label htmlFor='terms'>열림 문만 보기</label>
				</div>

				<div className='md:flex hidden justify-center items-center gap-3'>
					<label htmlFor='nodesFile'>노드 위치 CSV 파일 업로드:</label>
					<input
						id='nodesFile'
						ref={fileInputRef} // Ref orqali fayl inputni ulaymiz
						className='w-[220px] rounded-md flex items-center hover:underline underline-offset-4 duration-150'
						type='file'
						accept='.csv'
						// onChange={handleFileUpload}
					/>
				</div>
			</div>

			{/* CSV file data viewing in table */}

			{/* {fileData.length > 0 && (
				<>
					<table className='table-auto border-collapse border border-gray-400 mt-4 text-gray-700'>
						<thead>
							<tr>
								{Object.keys(fileData[0]).map((key, index) => (
									<th
										key={index}
										className='bg-gray-400 border border-gray-400 px-4 py-2'
									>
										{key}:
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{fileData.map((row, index) => (
								<tr key={index}>
									{Object.values(row).map((value, idx) => (
										<td
											key={idx}
											className='border border-gray-400 px-4 py-2 bg-white'
										>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
					<button
						className='py-2 px-3 w-fit h-auto bg-indigo-500 text-white text-mg rounded-md mt-3'
						onClick={() => SetPostionRequest(fileData)}
					>
						노드 위치 설정
					</button>
				</>
			)} */}
		</div>
	)
}

export default TotalcntCsv
