import { IBuilding } from '@/types/interfaces'
import { BsBuildingFill, BsBuildingsFill, BsCalendarDate } from 'react-icons/bs'
import { FaHourglassStart } from 'react-icons/fa6'
import { MdOutlineLocationCity } from 'react-icons/md'
interface BuildingCardProps {
	building: IBuilding
}

const BuildingCard = ({ building }: BuildingCardProps) => {
	const expirationDate = new Date(building.expiry_date)
	const today = new Date()

	const daysLeft = Math.ceil(
		(expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
	)

	// Expiry date ni YYYY-MM-DD formatida chiqarish
	const formattedExpiryDate = expirationDate.toISOString().split('T')[0]

	return (
		<div className='p-6 rounded-xl bg-white shadow-xl shadow-gray-200 cursor-pointer hover:shadow-gray-400 border border-slate-400'>
			<div className='flex justify-between items-start mb-6'>
				<h2 className='text-lg'>
					<span className='text-blue-600 font-medium'>
						{building.building_name}
					</span>
					<span className='ml-2'>건물-{building.building_num}</span>
				</h2>
				<BsBuildingsFill />
			</div>

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
		</div>
	)
}

export default BuildingCard
