import GatewaysList from '@/dashboard/components/shared-dash/GatewaysList'
import Header from '@/dashboard/components/shared-dash/Header'
import FilteredTotalCnt from '@/dashboard/components/shared-dash/TotalNumFiltered'
import { useGatewaysList } from '@/hooks/useProducts'

const GatewaysPage = () => {
	const { data } = useGatewaysList()

	return (
		<div className='w-full h-full'>
			<Header />

			<div className='grid grid-cols-1 mx-auto'>
				<FilteredTotalCnt item={data} itemName={'게이트웨이'} />
				<GatewaysList />
			</div>
		</div>
	)
}

export default GatewaysPage
