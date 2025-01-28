/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserState } from '@/stores/user.auth.store'
import axios from 'axios'
import { ReactNode, useEffect, useState } from 'react'
import FillLoading from '../shared/fill-laoding'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { setUser } = useUserState()
	const [isLoading, setIsloading] = useState(true)

	useEffect(() => {
		console.log('Check-auth user')
		const checkUser = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_SERVER_BASE_URL}/auth/check-user`,
					{
						withCredentials: true,
					}
				)
				const user = res.data.user
				setUser(user)
			} catch (error: any) {
				console.error('Failed to fetch user:', error.message || error)
			} finally {
				setIsloading(false)
			}
		}

		checkUser()
	}, [setUser])
	return isLoading ? <FillLoading /> : <>{children}</>
}

export default AuthProvider
