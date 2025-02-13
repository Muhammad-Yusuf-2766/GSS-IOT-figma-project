import { IBuilding, INode } from '@/types/interfaces'
import { create } from 'zustand'

interface NodeState {
	building: IBuilding | null
	nodes: INode[]
	setBuilding: (building: IBuilding) => void
	setNodes: (nodes: INode[]) => void
	updateNode: (node: INode) => void
}

export const useBuildingNodesStore = create<NodeState>(set => ({
	building: null,
	nodes: [],
	setBuilding: building => set({ building }),
	setNodes: nodes => set({ nodes }),
	updateNode: newNode =>
		set(state => ({
			nodes: state.nodes.map(node =>
				node.doorNum === newNode.doorNum ? newNode : node
			),
		})),
}))
