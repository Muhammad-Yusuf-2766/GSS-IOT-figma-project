import modalImg from '@/assets/도면.jpg'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { NodePositionRequest } from '@/services/apiRequests'
import { INodePositionFile } from '@/types/fileTypes'
import { IBuilding, INode } from '@/types/interfaces'
import axios from 'axios'
// import { DownloadIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ChartSpline, Download, Eye, FileText, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { HiMiniSquares2X2 } from 'react-icons/hi2'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import * as XLSX from 'xlsx'

interface IProps {
	nodes: INode[]
	onFilterChange: (filterOpenDoors: boolean) => void // Callback
	building?: IBuilding
}

interface IProps2 {
	building?: IBuilding
}

const TotalcntCsv = ({ nodes, onFilterChange }: IProps) => {
	const [fileData, setFileData] = useState<INodePositionFile[]>([])
	const [file, setFile] = useState<File | null>(null)
	const { buildingId } = useParams<{ buildingId: string }>()
	const fileInputRef = useRef<HTMLInputElement>(null) // Fayl input uchun ref
	const [filterOpenDoors, setFilterOpenDoors] = useState(false)
	const [fileName, setFileName] = useState('리포트 파일 선택') // "파일 선택" - "Choose File" degani

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		setFile(file)
		setFileName(file.name)

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

	const clearFile = () => {
		setFileName('리포트 파일 선택')
		setFile(null)
		setFileData([])
		if (fileInputRef.current) fileInputRef.current.value = ''
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
			<div className='w-full md:px-6 px-2 py-3 flex md:flex-row flex-col md:items-center items-start md:justify-between gap-3 bg-blue-900 text-white mx-auto text-sm'>
				{/* Grid div of context */}
				<div className='w-full flex'>
					{/* 1 items div */}
					<div className='md:w-1/2 w-full flex md:flex-row flex-col items-start justify-around'>
						{/* Total nodes number field */}
						<div className='flex items-center gap-3'>
							<HiMiniSquares2X2 className='md:text-[30px] text-[20px]' />
							<span>총 노드 수: {nodes.length}</span>
						</div>

						{/* Open doors field */}
						<div
							className={`w-fit flex items-center ${cn(
								nodes.filter(node => node.doorChk === 1).length > 0
									? 'text-red-500 gap-2'
									: ''
							)} gap-2`}
						>
							<p className='md:w-5 md:h-5 w-3 h-3 rounded-full bg-red-500 mx-auto animate-pulse' />
							열림 문 수: {''}
							{nodes.filter(node => node.doorChk === 1).length}
						</div>
					</div>

					{/* 2 items div */}
					<div className='md:w-1/2 w-full flex md:flex-row flex-col items-start justify-around gap-y-4'>
						{/* Filtering field */}
						<div className='flex justify-center items-center gap-3'>
							<Checkbox
								id='terms'
								checked={filterOpenDoors}
								onCheckedChange={handleCheckboxChange}
								className='border-secondary bg-white'
							/>
							<label htmlFor='terms'>열림 문만 보기</label>
						</div>

						{/* Nodes-position exel-file upload field - Show on both mobile and desktop with different styling */}
						<div className='flex justify-center items-center gap-2'>
							<label
								htmlFor='nodesFile'
								className='flex px-2 border border-white/60 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs md:text-sm'
							>
								{fileName.slice(0, 7)}
								{fileName !== '리포트 파일 선택' && '...'}
							</label>
							{fileName !== '리포트 파일 선택' && (
								<button
									type='button'
									onClick={clearFile}
									className='bg-gray-500/70 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-500/90 transition text-[15px]'
								>
									✕
								</button>
							)}

							{/* Yashirin file input */}
							<input
								id='nodesFile'
								ref={fileInputRef}
								type='file'
								accept='.xlsx, .xls'
								className='hidden'
								onChange={handleFileUpload}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* xlsx file data viewing in table */}
			{fileData.length > 0 && (
				<div className='mt-4 px-2'>
					{/* Header faqat bir marta ko'rsatiladi */}
					<div className='overflow-x-auto'>
						<table className='table-auto border-collapse border border-gray-400 w-full text-gray-700 text-xs md:text-sm'>
							<thead>
								<tr>
									{Object.keys(fileData[0]).map((key, idx) => (
										<th
											key={idx}
											className='bg-gray-400 py-2 text-center border'
										>
											{key}:
										</th>
									))}
								</tr>
							</thead>
						</table>
					</div>

					{/* Ma'lumotlarni ikkita qator qilib grid bilan joylashtiramiz */}
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mt-2'>
						{fileData.map((row, index) => (
							<div key={index} className='overflow-x-auto'>
								<table className='table-auto border-collapse border border-gray-400 text-gray-700 text-xs md:text-sm w-full'>
									<tbody>
										<tr>
											{Object.values(row).map((value, idx) => (
												<td
													key={idx}
													className='border border-gray-400 p-1 bg-white text-center'
												>
													{value || 'N/A'}
												</td>
											))}
										</tr>
									</tbody>
								</table>
							</div>
						))}
					</div>

					<Button
						className='mt-3 w-full md:w-auto'
						onClick={() => handleNodePositionRequest()}
					>
						노드 위치 설정
					</Button>
				</div>
			)}
		</div>
	)
}

export default TotalcntCsv

const ImageModal = ({
	imageUrl,
	onClose,
	buildingName,
}: {
	imageUrl: string
	onClose: () => void
	buildingName?: string
}) => {
	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white p-4 rounded-lg max-w-4xl w-full mx-2'>
				<h3 className='text-lg font-semibold mb-4'>{buildingName}</h3>
				<img
					src={imageUrl || '/placeholder.svg'}
					alt='Building'
					className='w-full h-auto'
				/>
				<Button onClick={onClose} className='mt-4'>
					닫기
				</Button>
			</div>
		</div>
	)
}

export const NodesMultipleButtonsField = ({ building }: IProps2) => {
	const [isOpen, setIsOpen] = useState(false)
	const { clientId } = useParams()

	const handleDownload = async (id: string) => {
		try {
			const response = await axios.get(
				`${
					import.meta.env.VITE_SERVER_BASE_URL
				}/product/download-nodes-history`,
				{
					params: { buildingId: id },
					responseType: 'blob',
				}
			)

			const url = window.URL.createObjectURL(new Blob([response.data]))
			const a = document.createElement('a')
			a.href = url
			a.download = 'building-nodes-history.xlsx'
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
		} catch (error) {
			console.error('Failed to download file:', error)
		}
	}

	return (
		<Card className='mt-4 border-slate-400'>
			<CardContent className='p-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
					{/* Floor Plan Upload */}
					<Button
						variant='outline'
						onClick={() => setIsOpen(true)}
						className='flex items-center gap-2 h-auto py-3 border-slate-400'
					>
						<Upload className='w-4 h-4' />
						<span className='text-sm'>도면 이미지 업로드</span>
					</Button>

					{/* Floor Plan View */}
					<Button
						variant='outline'
						onClick={() => setIsOpen(true)}
						className='flex items-center gap-2 h-auto py-3 border-slate-400'
					>
						<Eye className='w-4 h-4' />
						<span className='text-sm'>도면 보기</span>
					</Button>

					{/* Position File Download */}
					{building?.nodes_position_file && (
						<Button
							variant='outline'
							asChild
							className='flex items-center gap-2 h-auto py-3 border-slate-400'
						>
							<a
								href={`${
									import.meta.env.VITE_SERVER_BASE_URL
								}/exels/${encodeURIComponent(building.nodes_position_file)}`}
								download
							>
								<FileText className='w-4 h-4' />
								<span className='text-sm'>위치 파일</span>
								<Download className='w-3 h-3' />
							</a>
						</Button>
					)}

					{/* Nodes Report Download */}
					<Button
						variant='outline'
						onClick={() => handleDownload(building!._id)}
						className='flex items-center gap-2 h-auto py-3 border-slate-400'
					>
						<FileText className='w-4 h-4' />
						<span className='text-sm'>현장 노드 리포트</span>
						<Download className='w-3 h-3' />
					</Button>

					{/* Angle-Nodes page Link */}
					<Button
						variant='outline'
						asChild
						className='flex items-center gap-2 h-auto py-3 border-slate-400'
					>
						<Link
							to={`/admin/dashboard/clients/${clientId}/buildings/${
								building!._id
							}/angle-nodes`}
							className='flex items-center gap-2'
						>
							<ChartSpline className='w-4 h-4' />
							<span className='text-sm'>건물 비계전도 노드 보기기</span>
						</Link>
					</Button>
				</div>

				{/* Modal */}
				{isOpen && (
					<ImageModal
						imageUrl={modalImg}
						buildingName={building?.building_name}
						onClose={() => setIsOpen(false)}
					/>
				)}
			</CardContent>
		</Card>
	)
}
