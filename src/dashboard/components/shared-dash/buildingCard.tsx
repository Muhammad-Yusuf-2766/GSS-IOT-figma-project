import { BsBuildingFill, BsBuildingsFill, BsCalendarDate } from 'react-icons/bs'
import { FaHourglassStart } from 'react-icons/fa6'
import { MdOutlineLocationCity } from 'react-icons/md'
interface BuildingCardProps {
	buildingNumber: number
	totalGateways: number
	totalWorkers: number
	remainingDays: number
	expiryDate: string
	location: string
}

export function BuildingCard({
	buildingNumber,
	totalGateways,
	totalWorkers,
	remainingDays,
	expiryDate,
	location,
}: BuildingCardProps) {
	return (
		<div className='p-6 rounded-xl bg-white shadow-xl shadow-gray-200 cursor-pointer hover:shadow-gray-400 border-2'>
			<div className='flex justify-between items-start mb-6'>
				<h2 className='text-lg'>
					<span className='text-blue-600 font-medium'>Hyundai:</span>
					<span className='ml-2'>건물-{buildingNumber}</span>
				</h2>
				<BsBuildingsFill />
			</div>

			<div className='space-y-4'>
				<div className='flex justify-between items-center'>
					<div className='flex items-center gap-2 text-navy-700'>
						<BsBuildingFill />
						<span>총 게이트웨이</span>
					</div>
					<span>{totalGateways}</span>
				</div>

				<div className='flex justify-between items-center'>
					<div className='flex items-center gap-2 text-navy-700'>
						<BsBuildingFill />
						<span>총 근로자</span>
					</div>
					<span>{totalWorkers}</span>
				</div>

				<div className='flex justify-between items-center'>
					<div className='flex items-center gap-2 text-red-600'>
						<FaHourglassStart />
						<span>잔여일</span>
					</div>
					<span className='text-red-600'>{remainingDays}</span>
				</div>

				<div className='flex justify-between items-center'>
					<div className='flex items-center gap-2 text-gray-700'>
						<BsCalendarDate />
						<span>만료일</span>
					</div>
					<span>{expiryDate}</span>
				</div>

				<div className='flex justify-between items-center'>
					<div className='flex items-center gap-2 text-gray-700'>
						<MdOutlineLocationCity />
						<span>현장 주소</span>
					</div>
					<span className='text-right'>{location}</span>
				</div>
			</div>
		</div>
	)
}
