import Header from '@/dashboard/components/shared-dash/Header'
import NodesList from '@/dashboard/components/shared-dash/NodesList'
import FilteredTotalCnt from '@/dashboard/components/shared-dash/TotalNumFiltered'
import { getNodes } from '@/services/apiRequests'
import { useNodesListState } from '@/stores/nodesListStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const NodesPage = () => {
	const { nodes, setNodes } = useNodesListState()
	const { isLoading, error, data } = useQuery({
		queryKey: ['get-users'],
		queryFn: getNodes,
		enabled: !nodes || nodes.length === 0, // bu muhim!!!: users mavjud bo'lganda qayta so'rov yubormaydi.
		retry: 1,
	})

	useEffect(() => {
		if (data?.nodes) {
			setNodes(data.nodes)
		}
	}, [data, setNodes])
	return (
		<div className='w-full h-full flex flex-col'>
			<Header />
			<div className='w-full grid grid-cols-1 mx-auto'>
				<FilteredTotalCnt item={nodes} itemName={'노드'} />
				<NodesList nodes={nodes} />
			</div>
		</div>
	)
}

export default NodesPage
