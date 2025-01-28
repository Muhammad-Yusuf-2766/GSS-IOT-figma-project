import { IUser } from '@/types/interfaces'
import { create } from 'zustand'

interface IUserInterface {
	user: IUser | null
	setUser: (user: IUser) => void
	clearUser: () => void // Foydalanuvchini o'chirish funksiyasi
}

export const useUserState = create<IUserInterface>(set => ({
	user: null,
	setUser: user => set({ user }),
	clearUser: () => set({ user: null }),
}))
