import FillLoading from '@/components/shared/fill-laoding'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import BuildingCard from '@/dashboard/components/shared-dash/buildingCard'
import Header from '@/dashboard/components/shared-dash/Header'
import TotalCountBox from '@/dashboard/components/shared-dash/TotalCount'
import { useClientData } from '@/hooks/useClientdata'
import { IBuilding, ITotalCountBoxProps } from '@/types/interfaces'
import { AlertCircle } from 'lucide-react'
import { BsBuildingsFill } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'

const Buildings = () => {
	// const location = useLocation()
	// const buildings = Array.isArray(location.state) ? location.state : []
	// const totalBuildingNum = buildings.length

	const { clientId } = useParams()
	if (!clientId) {
		throw new Error('Client ID is missing')
	}

	console.log(clientId)
	const { data, isLoading, error } = useClientData(clientId)
	const totalBuildingNum = data?.buildings?.length || 0

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
					data &&
					(data.buildings ? (
						data.buildings.map((building: IBuilding) => (
							<Link key={building._id} to={`${building._id}`}>
								<BuildingCard building={building} />
							</Link>
						))
					) : (
						<>
							<h1 className='text-center text-red-600'>
								There is no any buldings for this client
							</h1>
						</>
					))}
			</div>
		</div>
	)
}

export default Buildings
