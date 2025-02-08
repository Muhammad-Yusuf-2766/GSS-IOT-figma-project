import FillLoading from '@/components/shared/fill-laoding'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import BuildingCard from '@/dashboard/components/shared-dash/buildingCard'
import Header from '@/dashboard/components/shared-dash/Header'
import TotalCountBox from '@/dashboard/components/shared-dash/TotalCount'
import { useClientBuildings } from '@/hooks/useClientdata'
import { useBuildingsStore } from '@/stores/buildingsStore'
import { IBuilding, ITotalCountBoxProps } from '@/types/interfaces'
import { AlertCircle } from 'lucide-react'
import { BsBuildingsFill } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'

const Buildings = () => {
	const { clientId } = useParams()
	if (!clientId) {
		throw new Error('Client ID is missing')
	}

	const { isLoading, error } = useClientBuildings(clientId)
	const { buildings } = useBuildingsStore()

	const totalCountData: ITotalCountBoxProps = {
		itemName: '클라이언트 건물',
		clients: buildings ? buildings : [],
		icon: <BsBuildingsFill />,
	}

	return (
		<div className='w-full h-full'>
			<Header />
			<div className='md:w-fit w-full mx-auto my-4'>
				<TotalCountBox data={totalCountData} />
			</div>

			{/* Loading field */}
			{isLoading && <FillLoading />}

			{/* Error fielad */}
			{error && (
				<div className=''>
					<Alert variant='destructive' className='md:w-1/2 mx-auto'>
						<AlertCircle />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>{error.message}</AlertDescription>
					</Alert>
				</div>
			)}

			{/* Data field */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
				{!isLoading &&
				buildings &&
				Array.isArray(buildings) &&
				buildings.length > 0 ? (
					buildings.map((building: IBuilding) =>
						building._id ? (
							<Link key={building._id} to={`${building._id}`}>
								<BuildingCard building={building} />
							</Link>
						) : null
					)
				) : (
					<h1 className='text-center text-red-600'>
						There are no buildings for this client
					</h1>
				)}
			</div>
		</div>
	)
}

export default Buildings
