// import { useBuildingNodesStore } from '@/stores/nodeStore'
// import { useEffect } from 'react'
// import io from 'socket.io-client'

// const socket = io('http://localhost:3005')

// const useSocket = () => {
// 	const { updateNode } = useBuildingNodesStore()

// 	useEffect(() => {
// 		socket.on('', node => {
// 			updateNode(node)
// 		})

// 		return () => {
// 			socket.off('doorStatus')
// 		}
// 	}, [updateNode])
// }

// export default useSocket
