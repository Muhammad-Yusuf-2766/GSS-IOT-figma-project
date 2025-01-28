import { INode } from '@/types/interfaces'
import { create } from 'zustand'

interface NodeState {
	nodes: INode[]
	updateNode: (doorNum: number, updatedData: Partial<INode>) => void
}

export const useNodeStore = create<NodeState>(set => ({
	nodes: [],
	updateNode: (doorNum, updatedData) =>
		set(state => ({
			nodes: state.nodes.map(node =>
				node.doorNum === doorNum ? { ...node, ...updatedData } : node
			),
		})),
}))
