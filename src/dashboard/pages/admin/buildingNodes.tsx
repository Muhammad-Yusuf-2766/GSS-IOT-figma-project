import BuildingNodes from '@/dashboard/components/shared-dash/buildingNodes'
import Header from '@/dashboard/components/shared-dash/Header'
import { useBuildingNodes } from '@/hooks/useClientdata'
import { useParams } from 'react-router-dom'

const BuildingNodePage = () => {
	const { buldingId } = useParams()
	if (!buldingId) {
		throw new Error('Client ID is missing')
	}

	const { data, isLoading } = useBuildingNodes(buldingId)

	if (isLoading) {
		return <div>Loading...</div> // Yangi sahifa ochilganda yuklanish holati
	}

	return (
		<div className='w-full h-full'>
			<Header />
			<BuildingNodes nodes={data ?? []} />
		</div>
	)
}

export default BuildingNodePage
