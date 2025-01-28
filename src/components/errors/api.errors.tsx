import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

type variant = 'default' | 'destructive'

interface ErrorProps {
	error: Error | null
	variant?: variant
	message: string
}

const GeneralError = ({ error, variant, message }: ErrorProps) => {
	return (
		<>
			{error && (
				<Alert className={`text-red-600 py-2 mt-2 w-full`} variant={variant}>
					<AlertCircle className='h-4 w-4' color='red' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error.message}</AlertDescription>
					<AlertDescription>{message}</AlertDescription>
				</Alert>
			)}
		</>
	)
}

export default GeneralError
