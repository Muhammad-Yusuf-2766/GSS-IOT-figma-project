import { useNodeStore } from '@/stores/nodeStore'
import { useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://your-mqtt-server-url')

const useSocket = () => {
	const { updateNode } = useNodeStore()

	useEffect(() => {
		socket.on('doorStatus', ({ doorNum, doorChk }) => {
			if (doorChk === 1) {
				// Node holatini yangilash
				updateNode(doorNum, { doorChk, product_status: true }) // Holatni yangilash
			}
		})

		return () => {
			socket.off('doorStatus')
		}
	}, [updateNode])
}

export default useSocket
