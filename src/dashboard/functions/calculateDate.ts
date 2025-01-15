export function calculateDaysUntilExpiry(expiryDateString: string): number {
	const [year, month, day] = expiryDateString.split('-').map(Number)
	const expiryDate = new Date(year, month - 1, day) // Month is zero-based in JavaScript Date
	const currentDate = new Date()
	const timeDifference = expiryDate.getTime() - currentDate.getTime() // getTime() bilan milisekund aniqlanadi
	const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
	return daysRemaining
}
