import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const scrollPositions: Record<string, number> = {}

const useScrollPosition = () => {
	const location = useLocation()
	const pathname = location.pathname
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// Sahifani tiklash
		const savedPosition = scrollPositions[pathname] || 0
		window.scrollTo(0, savedPosition)

		return () => {
			// Hozirgi pozitsiyani saqlash
			scrollPositions[pathname] = window.scrollY
		}
	}, [pathname])

	return ref
}

export default useScrollPosition
