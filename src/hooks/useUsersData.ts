import { getUsers } from '@/services/apiRequests'
import { useUsersStore } from '@/stores/usersStore'
import { IUser } from '@/types/interfaces'
import { useQuery } from '@tanstack/react-query'

export const useUsersList = () => {
	const { users, setUsers } = useUsersStore()
	return useQuery<IUser[]>({
		queryKey: ['get-nodes'],
		queryFn: async () => {
			const resUsers = await getUsers()
			setUsers(resUsers)
			return resUsers
		},
		enabled: !users || users.length === 0,
		retry: 1,
	})
}
