import { useUserState } from '@/stores/user.auth.store'
import { Navigate, useLocation } from 'react-router-dom'

import type React from 'react'

interface ProtectedRouteProps {
	children: React.ReactNode
	allowedRoles: string[]
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
	const { user } = useUserState()
	const location = useLocation()

	if (!user || !allowedRoles.includes(user.user_type)) {
		return <Navigate to='/auth' state={{ from: location.pathname }} replace />
	}

	return <>{children}</>
}

export default ProtectedRoute
