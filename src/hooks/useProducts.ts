import { getGateways, getNodes } from '@/services/apiRequests'
import { useGatewaysListStore } from '@/stores/gatewaysListStore'
import { useNodesListStore } from '@/stores/nodesListStore'
import { IGateway, INode } from '@/types/interfaces'
import { useQuery } from '@tanstack/react-query'

export const useGatewaysList = () => {
	const { gateways, setGateways } = useGatewaysListStore()
	return useQuery<IGateway[]>({
		queryKey: ['get-gateways'],
		queryFn: async () => {
			const resGateways = await getGateways()
			setGateways(resGateways)
			return resGateways
		},
		enabled: !gateways || gateways.length === 0,
		retry: 1,
		staleTime: 1000 * 60 * 5, // 5 daqiqa davomida eski ma'lumotlar ishlatiladi
	})
}

export const useNodesList = () => {
	const { nodes, setNodes } = useNodesListStore()
	return useQuery<INode[]>({
		queryKey: ['get-nodes'],
		queryFn: async () => {
			const resNodes = await getNodes()
			setNodes(resNodes)
			return resNodes
		},
		enabled: !nodes || nodes.length === 0,
		retry: 1,
	})
}
