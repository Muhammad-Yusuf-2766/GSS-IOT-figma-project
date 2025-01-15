import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollRestoration: React.FC = () => {
	const location = useLocation()

	useEffect(() => {
		// Har bir yo'nalishda scrollni yuqoriga ko'tarish
		window.scrollTo(0, 0)
	}, [location.pathname])

	return null
}

export default ScrollRestoration
