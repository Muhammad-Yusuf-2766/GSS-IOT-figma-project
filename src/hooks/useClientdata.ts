import {
	fetchBossClients,
	fetchBuildingNodes,
	fetchClientBuildings,
	fetchClients,
} from '@/services/apiRequests'
import { useClientStore } from '@/stores/buildingsStore'
import { useClientsSorte } from '@/stores/clientsStore'
import { useBuildingNodesStore } from '@/stores/nodeStore'
import { IClient, IClientBuildings, INode } from '@/types/interfaces'
import { useQuery } from '@tanstack/react-query'

// ==========================================================================================================
//    Bu React-Query Hook bo'lib reusable hook hisoblanadi. clientId o'zgarganda react-query ma'lumotlarni qaytadan yuklashi uchun clientId yozish kerak. ['clients'clientId] //
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
	const { setBuildings, setClient } = useClientStore()
	return useQuery<IClientBuildings>({
		queryKey: ['client-buildings', clientId],
		queryFn: async () => {
			const res = await fetchClientBuildings(clientId)
			setClient(res.client)
			setBuildings(res.client_buildings)
			return res
		},
		retry: 1,
	})
}

export const useBuildingNodes = (buildingId: string) => {
	const { setNodes, setBuilding } = useBuildingNodesStore()
	return useQuery<INode[]>({
		queryKey: ['building-nodes', buildingId],
		queryFn: async () => {
			const res = await fetchBuildingNodes(buildingId)
			setBuilding(res.building)
			setNodes(res.nodes)
			return res
		},
		retry: 1,
	})
}

// ==========================================================================================================
//                                 CLIENT Boss type user related Hooks                                     //
// ==========================================================================================================

export const useBossClients = (userId: string) => {
	const { clients, setClients } = useClientsSorte()
	return useQuery<IClient[]>({
		queryKey: ['boss-client'],
		queryFn: async () => {
			const resClients = await fetchBossClients(userId)
			setClients(resClients)
			return resClients
		},
		enabled: !clients || clients.length === 0,
		retry: 1,
	})
}
