import FillLoading from '@/components/shared/fill-laoding'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import BuildingCard from '@/dashboard/components/shared-dash/buildingCard'
import Header from '@/dashboard/components/shared-dash/Header'
import TotalCountBox from '@/dashboard/components/shared-dash/TotalCount'
import { useClientBuildings } from '@/hooks/useClientdata'
import { deleteBuilding } from '@/services/apiRequests'
import { useClientStore } from '@/stores/buildingsStore'
import { IBuilding, ITotalCountBoxProps } from '@/types/interfaces'
import { AlertCircle } from 'lucide-react'
import { BsBuildingsFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const Buildings = () => {
	const { clientId } = useParams()
	const { isLoading, error, refetch } = useClientBuildings(clientId || '')
	const { client_buildings } = useClientStore()

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteBuilding(id)
			const info = `${res.state}-${res.message}`
			toast.success(info)
			refetch()
		} catch (error) {
			toast.error((error as Error).message || 'Error on deleting node status')
		}
	}

	const totalCountData: ITotalCountBoxProps = {
		itemName: '클라이언트 건물',
		clients: client_buildings ? client_buildings : [],
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
				client_buildings &&
				Array.isArray(client_buildings) &&
				client_buildings.length > 0 ? (
					client_buildings.map((building: IBuilding) =>
						building._id ? (
							<BuildingCard onDelete={handleDelete} building={building} />
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
