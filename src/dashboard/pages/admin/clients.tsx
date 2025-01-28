import FillLoading from '@/components/shared/fill-laoding'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import ClientCard from '@/dashboard/components/shared-dash/ClientCard'
import Header from '@/dashboard/components/shared-dash/Header'
import TotalCountBox from '@/dashboard/components/shared-dash/TotalCount'
import { fetchClients } from '@/services/apiRequests'
import { IClient, ITotalCountBoxProps } from '@/types/interfaces'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import { LuUser } from 'react-icons/lu'
import { Link } from 'react-router-dom'

const Clients = () => {
	const { data, isLoading, error } = useQuery<IClient[]>({
		queryKey: ['clients'],
		queryFn: fetchClients,
		retry: 1,
	})

	const totalClientCount = data?.length

	const totalCountData: ITotalCountBoxProps = {
		itemName: '임대 현황',
		itemCount: totalClientCount,
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
						<Link
							key={client._id}
							to={`/admin/dashboard/client/${client._id}/buildings`}
							state={client.buildings} // React Router orqali state yuborish
						>
							<ClientCard client={client} />
						</Link>
					))}
			</div>
		</div>
	)
}

export default Clients
