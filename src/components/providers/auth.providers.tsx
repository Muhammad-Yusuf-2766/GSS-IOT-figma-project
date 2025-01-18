import { useUserState } from '@/stores/user.auth.store'
import axios from 'axios'
import { ReactNode, useEffect, useState } from 'react'
import FillLoading from '../shared/fill-laoding'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { setUser } = useUserState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Tokenni localStorage yoki cookie orqali olish
		const token = localStorage.getItem('authToken')

		if (token) {
			// API orqali foydalanuvchi ma'lumotlarini tasdiqlash
			axios
				.get('/api/auth/verify', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(response => {
					setUser(response.data.user) // Foydalanuvchi ma'lumotlarini saqlash
				})
				.catch(error => {
					console.error('Authentication failed:', error)
					localStorage.removeItem('authToken') // Tokenni o'chirish
				})
				.finally(() => {
					setIsLoading(false)
				})
		} else {
			setIsLoading(false) // Token yo'q bo'lsa, yuklashni to'xtatish
		}
	}, [])

	return isLoading ? <FillLoading /> : <>{children}</>
}

export default AuthProvider
