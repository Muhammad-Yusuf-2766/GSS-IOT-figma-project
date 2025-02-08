import BuildingNodes from '@/dashboard/components/shared-dash/buildingNodes'
import Header from '@/dashboard/components/shared-dash/Header'
import { useBuildingNodes } from '@/hooks/useClientdata'
import { useNodesStore } from '@/stores/nodeStore'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3005') // Backend server manzilini o'zgartiring

const BuildingNodePage = () => {
	const { buldingId } = useParams()
	if (!buldingId) {
		throw new Error('Building ID is missing')
	}

	const { isLoading } = useBuildingNodes(buldingId)
	const { updateNode } = useNodesStore() // updateNode funksiyasi kerak

	useEffect(() => {
		socket.on('mqttNodeData', updatedNode => {
			console.log('New MQTT Data:', updatedNode)
			updateNode(updatedNode)
		})

		return () => {
			socket.off('mqttNodeData')
		}
	}, [buldingId, updateNode])

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='w-full h-full'>
			<Header />
			<BuildingNodes />
		</div>
	)
}

export default BuildingNodePage
