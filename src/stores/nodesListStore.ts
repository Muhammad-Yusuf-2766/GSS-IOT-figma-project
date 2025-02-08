import { INode } from '@/types/interfaces'
import { create } from 'zustand'

interface INodesStore {
	nodes: INode[]
	setNodes: (nodes: INode[]) => void
}

export const useNodesListStore = create<INodesStore>(set => ({
	nodes: [],
	setNodes: nodes => set({ nodes }),
}))
