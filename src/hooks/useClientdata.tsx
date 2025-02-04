import {
	fetchBuildingNodes,
	fetchClientBuildings,
	fetchClients,
} from '@/services/apiRequests'
import { IClient, IClientBuildings, INode } from '@/types/interfaces'
import { useQuery } from '@tanstack/react-query'

// ==========================================================================================================
//    Bu React-Query Hook bo'lib reusable hook hsioblanadi. clientId o'zgarganda react-query ma'lumotlarni qaytadan yuklashi uchun clientId yozish kerak. ['clients'clientId] //
// ==========================================================================================================

export const useAllClients = () => {
	return useQuery<IClient[]>({
		queryKey: ['clients'],
		queryFn: fetchClients,
	})
}

export const useClientBuildings = (clientId: string) => {
	return useQuery<IClientBuildings>({
		queryKey: ['clients', clientId],
		queryFn: () => fetchClientBuildings(clientId),
	})
}

export const useBuildingNodes = (buildingId: string) => {
	return useQuery<INode[]>({
		queryKey: ['building-nodes', buildingId],
		queryFn: () => fetchBuildingNodes(buildingId),
	})
}
