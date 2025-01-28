import { create } from 'zustand'

type AuhtState = 'login' | 'register' | 'reset-password'

interface IAuthStateStore {
	authState: AuhtState
	setAuth: (state: AuhtState) => void
}

export const useAuthState = create<IAuthStateStore>(set => ({
	authState: 'login',
	setAuth: state => set({ authState: state }),
}))
