import {
	fetchBuildingNodes,
	fetchClientBuildings,
	fetchClients,
} from '@/services/apiRequests'
import { useBuildingsStore } from '@/stores/buildingsStore'
import { useClientsSorte } from '@/stores/clientsStore'
import { useNodesStore } from '@/stores/nodeStore'
import { IClient, IClientBuildings, INode } from '@/types/interfaces'
import { useQuery } from '@tanstack/react-query'

// ==========================================================================================================
//    Bu React-Query Hook bo'lib reusable hook hsioblanadi. clientId o'zgarganda react-query ma'lumotlarni qaytadan yuklashi uchun clientId yozish kerak. ['clients'clientId] //
// ==========================================================================================================

export const useClients = () => {
	const { clients, setClients } = useClientsSorte()
	return useQuery<IClient[]>({
		queryKey: ['clients'],
		queryFn: async () => {
			const resClients = await fetchClients()
			setClients(resClients)
			return resClients
		},
		enabled: !clients || clients.length === 0,
		retry: 1,
	})
}

export const useClientBuildings = (clientId: string) => {
	const { setBuildings } = useBuildingsStore()
	return useQuery<IClientBuildings>({
		queryKey: ['clients', clientId],
		queryFn: async () => {
			const resBuildings = await fetchClientBuildings(clientId)
			setBuildings(resBuildings)
			return resBuildings
		},
		retry: 1,
	})
}

export const useBuildingNodes = (buildingId: string) => {
	const { setNodes } = useNodesStore()
	return useQuery<INode[]>({
		queryKey: ['building-nodes', buildingId],
		queryFn: async () => {
			const resNodes = await fetchBuildingNodes(buildingId)
			setNodes(resNodes)
			return resNodes
		},
		retry: 1,
	})
}
