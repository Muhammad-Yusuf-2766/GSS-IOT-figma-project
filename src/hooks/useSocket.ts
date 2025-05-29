// src/socket.ts
import { io, Socket } from 'socket.io-client'

const socket: Socket = io(`${import.meta.env.VITE_SERVER_BASE_URL}`, {
	transports: ['websocket'],
	autoConnect: true,
})

export default socket
