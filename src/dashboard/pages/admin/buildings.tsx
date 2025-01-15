import { BuildingCard } from '@/dashboard/components/shared-dash/buildingCard'
import Header from '@/dashboard/components/shared-dash/Header'
import TotalCountBox from '@/dashboard/components/shared-dash/TotalCount'
import { ITotalCountBoxProps } from '@/types/interfaces'
import { BsBuildingsFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const buildingData = [
	{
		id: 1,
		buildingNumber: 1,
		totalGateways: 1,
		totalWorkers: 3,
		remainingDays: -25,
		expiryDate: '2024-12-17',
		location: '경기도 고양시 화정동',
	},
	{
		id: 2,
		buildingNumber: 2,
		totalGateways: 1,
		totalWorkers: 0,
		remainingDays: -17,
		expiryDate: '2024-12-25',
		location: '경기도 고양시 화정동',
	},
	{
		id: 3,
		buildingNumber: 3,
		totalGateways: 1,
		totalWorkers: 1,
		remainingDays: 0,
		expiryDate: '2025-01-11',
		location: '경기도 고양시 화정동',
	},
	{
		id: 4,
		buildingNumber: 1,
		totalGateways: 1,
		totalWorkers: 3,
		remainingDays: -25,
		expiryDate: '2024-12-17',
		location: '경기도 고양시 화정동',
	},
	{
		id: 9,
		buildingNumber: 5,
		totalGateways: 1,
		totalWorkers: 0,
		remainingDays: -17,
		expiryDate: '2024-12-25',
		location: '경기도 고양시 화정동',
	},
	{
		id: 5,
		buildingNumber: 3,
		totalGateways: 1,
		totalWorkers: 1,
		remainingDays: 0,
		expiryDate: '2025-01-11',
		location: '경기도 고양시 화정동',
	},
	{
		id: 6,
		buildingNumber: 1,
		totalGateways: 1,
		totalWorkers: 3,
		remainingDays: -25,
		expiryDate: '2024-12-17',
		location: '경기도 고양시 화정동',
	},
	{
		id: 7,
		buildingNumber: 2,
		totalGateways: 1,
		totalWorkers: 0,
		remainingDays: -17,
		expiryDate: '2024-12-25',
		location: '경기도 고양시 화정동',
	},
	{
		id: 8,
		buildingNumber: 3,
		totalGateways: 1,
		totalWorkers: 1,
		remainingDays: 0,
		expiryDate: '2025-01-11',
		location: '경기도 고양시 화정동',
	},
]
const totalBuildingNum = buildingData.length

export default function Buildings() {
	const totalCountData: ITotalCountBoxProps = {
		itemName: '클라이언트 건물',
		itemCount: totalBuildingNum,
		icon: <BsBuildingsFill />,
	}
	return (
		<div className='w-full h-full'>
			<Header />
			<div className='md:w-fit w-full mx-auto my-4'>
				<TotalCountBox data={totalCountData} />
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
				{buildingData.map(building => (
					<Link to={`building/${building.id}`}>
						<BuildingCard key={building.buildingNumber} {...building} />
					</Link>
				))}
			</div>
		</div>
	)
}
