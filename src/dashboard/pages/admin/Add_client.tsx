import BuildingForm from '@/components/forms/Building_form'
import ClientForm from '@/components/forms/Client_form'
import Header from '@/dashboard/components/shared-dash/Header'
import {
	getActiveBuildings,
	getActiveGateways,
	getUsers,
} from '@/services/apiRequests'
import { useQueries } from '@tanstack/react-query'

const AddClient = () => {
	const results = useQueries({
		queries: [
			{
				queryKey: ['get-active-gateways'],
				queryFn: getActiveGateways,
				retry: 1,
			},
			{
				queryKey: ['get-users'],
				queryFn: getUsers,
				retry: 1,
			},
			{
				queryKey: ['get-active-buildings'],
				queryFn: getActiveBuildings,
				retry: 1,
			},
		],
	})

	// Ma'lumotlarni olish
	const gateways = results[0].data
	const users = results[1].data
	const builidngs = results[2].data
	const isLoading = results.some(query => query.isLoading)
	// const isError = results.some(query => query.isError)

	// Refetch funksiyalarini olish
	const refetchAll = () => {
		results.forEach(query => query.refetch())
	}

	if (isLoading) return <p>Loading...</p>
	// if (isError) return <p>Error loading data</p>

	return (
		<div className='w-full h-full flex flex-col justify-between'>
			<Header />
			<div className='w-full h-full md:flex justify-center md:items-start mt-10 gap-3 p-3 pb-6 md:space-y-0 space-y-5'>
				<BuildingForm gateways={gateways} users={users} refetch={refetchAll} />
				<ClientForm buildings={builidngs} users={users} />
			</div>
		</div>
	)
}

export default AddClient
