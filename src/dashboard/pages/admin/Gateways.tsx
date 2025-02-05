import GatewaysList from '@/dashboard/components/shared-dash/GatewaysList'
import Header from '@/dashboard/components/shared-dash/Header'
import FilteredTotalCnt from '@/dashboard/components/shared-dash/TotalNumFiltered'
import { getGateways } from '@/services/apiRequests'
import { useGatewaysListState } from '@/stores/gatewaysListStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const GatewaysPage = () => {
	const { gateways, setGateways } = useGatewaysListState()

	const { data } = useQuery({
		queryKey: ['get-users'],
		queryFn: getGateways,
		enabled: !gateways || gateways.length === 0, // bu muhim!!!: users mavjud bo'lganda qayta so'rov yubormaydi.
		retry: 1,
	})

	useEffect(() => {
		if (data?.gateways) {
			setGateways(data.gateways)
		}
	}, [data, setGateways])
	return (
		<div className='w-full h-full'>
			<Header />

			<div className='grid grid-cols-1 mx-auto'>
				<FilteredTotalCnt item={gateways} itemName={'게이트웨이'} />
				<GatewaysList gateways={gateways} />
			</div>
		</div>
	)
}

export default GatewaysPage
