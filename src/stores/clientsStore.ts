import { IClient } from '@/types/interfaces'
import { create } from 'zustand'

interface ClientsState {
	clients: IClient[]
	setClients: (clients: IClient[]) => void
}

export const useClientsSorte = create<ClientsState>(set => ({
	clients: [],
	setClients: clients => set({ clients }),
}))
