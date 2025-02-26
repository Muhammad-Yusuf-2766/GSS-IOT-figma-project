import FillLoading from '@/components/shared/fill-laoding'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import ClientCard from '@/dashboard/components/shared-dash/ClientCard'
import Header from '@/dashboard/components/shared-dash/Header'
import TotalCountBox from '@/dashboard/components/shared-dash/TotalCount'
import { useClients } from '@/hooks/useClientdata'
import { deleteClient } from '@/services/apiRequests'
import { ITotalCountBoxProps } from '@/types/interfaces'
import { AlertCircle } from 'lucide-react'
import { LuUser } from 'react-icons/lu'
import { toast } from 'sonner'

const Clients = () => {
	const { data, isLoading, error, refetch } = useClients()

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteClient(id)
			const info = `${res.state}-${res.message}`
			toast.success(info)
			refetch()
		} catch (error) {
			toast.error((error as Error).message || 'Error on deleting node status')
		}
	}

	const totalCountData: ITotalCountBoxProps = {
		itemName: '임대 현황',
		clients: data,
		icon: <LuUser />,
	}

	return (
		<div className='w-full h-full relative md:ml-1'>
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

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
				{/* Data field */}
				{!isLoading &&
					data &&
					data.length > 0 &&
					data.map(client => (
						<ClientCard
							key={client._id}
							onDelete={handleDelete}
							client={{
								...client,
								client_buildings: client.client_buildings ?? [],
							}}
						/>
					))}
			</div>
		</div>
	)
}

export default Clients
