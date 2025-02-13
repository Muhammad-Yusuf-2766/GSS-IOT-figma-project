import Header from '@/dashboard/components/shared-dash/Header'
import NodesList from '@/dashboard/components/shared-dash/NodesList'
import FilteredTotalCnt from '@/dashboard/components/shared-dash/TotalNumFiltered'
import { useNodesList } from '@/hooks/useProducts'

const NodesPage = () => {
	const { data } = useNodesList()

	return (
		<div className='w-full h-full flex flex-col'>
			<Header />
			<div className='w-full grid grid-cols-1 mx-auto'>
				<FilteredTotalCnt item={data} itemName={'노드'} />
				<NodesList />
			</div>
		</div>
	)
}

export default NodesPage
