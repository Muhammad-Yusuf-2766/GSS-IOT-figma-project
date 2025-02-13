import FillLoading from '@/components/shared/fill-laoding'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import ClientCard from '@/dashboard/components/shared-dash/ClientCard'
import TotalCountBox from '@/dashboard/components/shared-dash/TotalCount'
import { useBossClients } from '@/hooks/useClientdata'
import { useUserState } from '@/stores/user.auth.store'
import { ITotalCountBoxProps } from '@/types/interfaces'
import { AlertCircle } from 'lucide-react'
import { LuUser } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { ClientHeader } from './buildingNodes'

const ClientBossClientsPage = () => {
	const { user } = useUserState()
	const { data, isLoading, error } = useBossClients(user?._id || '')

	const totalCountData: ITotalCountBoxProps = {
		itemName: '임대 현황',
		clients: data,
		icon: <LuUser />,
	}

	return (
		<div className='w-full h-full relative'>
			<ClientHeader />
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

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
				{/* Data field */}
				{!isLoading &&
					data &&
					data.length > 0 &&
					data.map(client => (
						<Link key={client._id} to={`${client._id}/buildings`}>
							<ClientCard
								client={{
									...client,
									client_buildings: client.client_buildings ?? [],
								}}
							/>
						</Link>
					))}
			</div>
		</div>
	)
}

export default ClientBossClientsPage
