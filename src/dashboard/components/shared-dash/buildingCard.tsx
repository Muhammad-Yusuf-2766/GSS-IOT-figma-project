import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { IBuilding } from '@/types/interfaces'
import { useState } from 'react'
import { BsBuildingFill, BsBuildingsFill, BsCalendarDate } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { FaArrowRightLong, FaHourglassStart } from 'react-icons/fa6'
import { MdEdit, MdOutlineLocationCity } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
interface BuildingCardProps {
	building: IBuilding
	onDelete: (id: string) => void
}

const BuildingCard = ({ building, onDelete }: BuildingCardProps) => {
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)

	const handleRedirect = () => {
		navigate(`${building._id}`)
	}

	const expirationDate = new Date(building.expiry_date)
	const today = new Date()

	const daysLeft = Math.ceil(
		(expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
	)

	const formattedExpiryDate = expirationDate.toISOString().split('T')[0]

	return (
		<div className='p-6 rounded-xl bg-white shadow-xl shadow-gray-200 border border-slate-400 self-start'>
			{/* Building-name */}
			<div className='flex justify-between items-start mb-6'>
				<h2 className='text-lg'>
					<span className='text-blue-600 font-medium'>
						{building.building_name}
					</span>
					<span className='ml-2'>건물-{building.building_num}</span>
				</h2>
				<BsBuildingsFill />
			</div>

			<Accordion type='single' collapsible className='w-full'>
				<AccordionItem value='item-1'>
					<AccordionTrigger onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? '건물 정보 닫기' : '건물 정보 보기'}
					</AccordionTrigger>
					<AccordionContent>
						<div className='space-y-4'>
							<div className='flex justify-between items-center'>
								<div className='flex items-center gap-2 text-navy-700'>
									<BsBuildingFill />
									<span>총 게이트웨이</span>
								</div>
								<span>{building.gateway_sets.length}</span>
							</div>

							<div className='flex justify-between items-center'>
								<div className='flex items-center gap-2 text-navy-700'>
									<BsBuildingFill />
									<span>총 근로자</span>
								</div>
								<span>{building.users.length}</span>
							</div>

							<div className='flex justify-between items-center'>
								<div className='flex items-center gap-2 text-red-600'>
									<FaHourglassStart />
									<span>잔여일</span>
								</div>
								<span className='text-red-600'>{daysLeft}</span>
							</div>

							<div className='flex justify-between items-center'>
								<div className='flex items-center gap-2 text-gray-700'>
									<BsCalendarDate />
									<span>만료일</span>
								</div>
								<span>{formattedExpiryDate}</span>
							</div>

							<div className='flex justify-between items-center'>
								<div className='flex items-center gap-2 text-gray-700'>
									<MdOutlineLocationCity />
									<span>현장 주소</span>
								</div>
								<span className='text-right'>{building.building_addr}</span>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			{/* Building buttons */}
			<div className='mt-6 w-full flex justify-between'>
				<Button
					variant={'ghost'}
					onClick={handleRedirect}
					className='w-fit flex items-center justify-center gap-x-3 hover:bg-blue-100 bg-blue-50 '
				>
					<span className='md:flex text-gray-500'>노드 보기</span>
					<FaArrowRightLong size={20} className='text-blue-500 ' />
				</Button>
				<div className='flex gap-1'>
					<Button
						className='flex items-center justify-center hover:bg-blue-100 bg-blue-50 gap-x-3 text-gray text-blue-500'
						aria-label='Edit client'
					>
						<MdEdit size={18} />
					</Button>
					<Button
						onClick={() =>
							confirm(
								`이 ${building.building_name} ${building.building_num} 건물을 삭제 하시겠습니까?`
							) && onDelete(building._id)
						}
						className='flex items-center justify-center gap-x-3 hover:bg-blue-100 bg-blue-50 text-gray text-red-500'
						aria-label='Delete client'
					>
						<FaTrash size={15} />
					</Button>
				</div>
			</div>
		</div>
	)
}

export default BuildingCard
