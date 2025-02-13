import { IBuilding, IClient } from '@/types/interfaces'
import { create } from 'zustand'

interface NodeState {
	client: IClient | null
	client_buildings: IBuilding[]
	setClient: (client: IClient) => void
	setBuildings: (buildings: IBuilding[]) => void
}

export const useClientStore = create<NodeState>(set => ({
	client: null,
	client_buildings: [],
	setClient: client => set({ client }),
	setBuildings: client_buildings => set({ client_buildings }),
}))
