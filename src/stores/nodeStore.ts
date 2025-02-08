import { INode } from '@/types/interfaces'
import { create } from 'zustand'

interface NodeState {
	nodes: INode[]
	setNodes: (nodes: INode[]) => void
	updateNode: (node: INode) => void
}

export const useNodesStore = create<NodeState>(set => ({
	nodes: [],
	setNodes: nodes => set({ nodes }),
	updateNode: newNode =>
		set(state => ({
			nodes: state.nodes.map(node =>
				node.doorNum === newNode.doorNum ? newNode : node
			),
		})),
}))
