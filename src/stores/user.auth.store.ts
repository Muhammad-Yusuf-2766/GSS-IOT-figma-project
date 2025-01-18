import { create } from 'zustand'

type UserType = {
	id: string
	name: string
	email: string
	role?: string // Ixtiyoriy maydon
} | null

interface IUserInterface {
	user: UserType
	setUser: (user: UserType) => void
	clearUser: () => void // Foydalanuvchini o'chirish funksiyasi
}

export const useUserState = create<IUserInterface>(set => ({
	user: null,
	setUser: user => set({ user }),
	clearUser: () => set({ user: null }),
}))
