import { IGateway } from '@/types/interfaces'
import { create } from 'zustand'

interface IGatewayStore {
	gateways: IGateway[]
	setGateways: (gateways: IGateway[]) => void
}

export const useGatewaysListStore = create<IGatewayStore>(set => ({
	gateways: [],
	setGateways: gateways => set({ gateways }),
}))
