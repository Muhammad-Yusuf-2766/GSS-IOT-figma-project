import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { NodePositionRequest } from '@/services/apiRequests'
import { INodePositionFile } from '@/types/fileTypes'
import { INode } from '@/types/interfaces'
import { useRef, useState } from 'react'
import { HiMiniSquares2X2 } from 'react-icons/hi2'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import * as XLSX from 'xlsx'

interface IProps {
	nodes: INode[]
	onFilterChange: (filterOpenDoors: boolean) => void // Callback
}

const TotalcntCsv = ({ nodes, onFilterChange }: IProps) => {
	const [fileData, setFileData] = useState<INodePositionFile[]>([])
	const [file, setFile] = useState<File | null>(null)
	const { buildingId } = useParams<{ buildingId: string }>()
	const fileInputRef = useRef<HTMLInputElement>(null) // Fayl input uchun ref
	const [filterOpenDoors, setFilterOpenDoors] = useState(false)

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		setFile(file)

		const reader = new FileReader()

		reader.onload = event => {
			const data = new Uint8Array(event.target?.result as ArrayBuffer)
			const workbook = XLSX.read(data, { type: 'array' })

			// 1-chi varaqni o'qish (sheet)
			const sheetName = workbook.SheetNames[0]
			const worksheet = workbook.Sheets[sheetName]

			// Excelni JSON formatiga o'girish
			const jsonData: INodePositionFile[] =
				XLSX.utils.sheet_to_json<INodePositionFile>(worksheet)

			// `nodeNum` ni number ga aylantirish
			const cleanedData = jsonData.map(row => ({
				...row,
				nodeNum: Number(row.nodeNum), // Agar number emas bo'lsa avtomatik numberga o‘tkazadi
			}))

			console.log('ParsedData:', cleanedData)
			setFileData(cleanedData)
		}

		reader.readAsArrayBuffer(file)
	}

	const handleNodePositionRequest = async () => {
		if (!file || fileData.length === 0) {
			alert('Fayl tanlang yoki ma`lumot to`ldirilmagan!')
			return
		}
		const formData: FormData = new FormData()
		formData.append('file', file)
		formData.append('buildingId', buildingId ?? '')
		formData.append('nodesPosition', JSON.stringify(fileData))

		const promise = NodePositionRequest(formData)
		toast.promise(promise, {
			loading: 'Saving positions...',
			success: response => {
				const positionedNodes = response
				if (positionedNodes.state === 'success') {
					setTimeout(() => {
						setFileData([]) // FileData-ni bo'shatamiz
						if (fileInputRef.current) fileInputRef.current.value = ''
					}, 1000)
					return positionedNodes.message
				} else {
					throw new Error(positionedNodes.message)
				}
			},
			error: error => {
				return error.message || 'Something went wrong!'
			},
		})
	}

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
						accept='.xlsx, .xls'
						onChange={handleFileUpload}
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

			{fileData.length > 0 && (
				<div className=''>
					{/* Header faqat bir marta ko'rsatiladi */}
					<table className='table-auto border-collapse border border-gray-400 w-full text-gray-700'>
						<thead>
							<tr>
								{Object.keys(fileData[0]).map((key, idx) => (
									<th key={idx} className='bg-gray-400 py-2 text-center border'>
										{key}:
									</th>
								))}
							</tr>
						</thead>
					</table>

					{/* Ma'lumotlarni ikkita qator qilib grid bilan joylashtiramiz */}
					<div className='grid md:grid-cols-4 gap-4 mt-2'>
						{fileData.map((row, index) => (
							<table
								key={index}
								className='table-auto border-collapse border border-gray-400 text-gray-700'
							>
								<tbody>
									<tr>
										{Object.values(row).map((value, idx) => (
											<td
												key={idx}
												className='w-1/2 border border-gray-400 p-1 bg-white text-center'
											>
												{value || 'N/A'}
											</td>
										))}
									</tr>
								</tbody>
							</table>
						))}
					</div>

					<Button className='mt-3' onClick={() => handleNodePositionRequest()}>
						노드 위치 설정
					</Button>
				</div>
			)}
		</div>
	)
}

export default TotalcntCsv
