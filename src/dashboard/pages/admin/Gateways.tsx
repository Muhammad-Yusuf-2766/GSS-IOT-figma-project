import { Gateways } from '@/constants'
import GatewaysList from '@/dashboard/components/shared-dash/GatewaysList'
import Header from '@/dashboard/components/shared-dash/Header'
import FilteredTotalCnt from '@/dashboard/components/shared-dash/TotalNumFiltered'

const GatewaysPage = () => {
	return (
		<div className='w-full h-full flex flex-col'>
			<Header />
			<div className='w-full grid grid-cols-1 mx-auto'>
				<FilteredTotalCnt item={Gateways} itemName={'게이트웨이'} />
				<GatewaysList allgateways={Gateways} />
			</div>
		</div>
	)
}

export default GatewaysPage
