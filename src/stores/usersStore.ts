import { IUser } from '@/types/interfaces'
import { create } from 'zustand'

interface IUsersInterface {
	users: IUser[]
	setUsers: (users: IUser[]) => void
}

export const useUsersStore = create<IUsersInterface>(set => ({
	users: [],
	setUsers: users => set({ users }),
}))
