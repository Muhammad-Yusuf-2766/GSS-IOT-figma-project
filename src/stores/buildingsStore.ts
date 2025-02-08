import { IBuilding } from '@/types/interfaces'
import { create } from 'zustand'

interface NodeState {
	buildings: IBuilding[]
	setBuildings: (buildings: IBuilding[]) => void
}

export const useBuildingsStore = create<NodeState>(set => ({
	buildings: [],
	setBuildings: buildings => set({ buildings }),
}))
