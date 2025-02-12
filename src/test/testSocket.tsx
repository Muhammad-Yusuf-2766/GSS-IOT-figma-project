// import { useEffect, useState } from 'react'
// import { io } from 'socket.io-client'

// const socket = io('http://localhost:3005') // Backend server manzilini to'g'ri kiriting

// const SocketComponent = () => {
// 	const [updatedNode, setUpdatedNode] = useState(null)

// 	useEffect(() => {
// 		// Serverdan kelgan `mqttNodeData` hodisasini tinglash
// 		socket.on('mqttNodeData', data => {
// 			console.log('Received updated node:', data)
// 			setUpdatedNode(data)
// 		})

// 		// Komponent unmount bo'lganda socketni tozalash
// 		return () => {
// 			socket.off('mqttNodeData')
// 		}
// 	}, [])

// 	return (
// 		<div>
// 			<h2>MQTT Node Data</h2>
// 			{updatedNode ? (
// 				<pre>{JSON.stringify(updatedNode, null, 2)}</pre>
// 			) : (
// 				<p>Ma'lumot kutilmoqda...</p>
// 			)}
// 		</div>
// 	)
// }

// export default SocketComponent
