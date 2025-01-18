import { Nodes } from '@/constants'
import Header from '@/dashboard/components/shared-dash/Header'
import NodesList from '@/dashboard/components/shared-dash/NodesList'
import FilteredTotalCnt from '@/dashboard/components/shared-dash/TotalNumFiltered'

const NodesPage = () => {
	return (
		<div className='w-full h-full flex flex-col'>
			<Header />
			<div className='w-full grid grid-cols-1 mx-auto'>
				<FilteredTotalCnt item={Nodes} itemName={'게이트웨이'} />
				<NodesList nodes={Nodes} />
			</div>
		</div>
	)
}

export default NodesPage
