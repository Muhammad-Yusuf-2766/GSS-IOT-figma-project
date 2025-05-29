'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const media = window.matchMedia(query)

		// Initial check
		setMatches(media.matches)

		// Update matches when the media query changes
		const listener = (event: MediaQueryListEvent) => {
			setMatches(event.matches)
		}

		// Add listener
		media.addEventListener('change', listener)

		// Clean up
		return () => {
			media.removeEventListener('change', listener)
		}
	}, [query])

	return matches
}
