import { loginSchema } from '@/lib/vatidation'
import { useAuthState } from '@/stores/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import FillLoading from '../shared/fill-laoding'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

const Login = () => {
	const { setAuth } = useAuthState()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	// const navigate = useNavigate()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' }, // To'g'ri yozilgan
	})

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		const { email, password } = values // To'g'ri destructuring
		alert(email + password)

		setIsLoading(true)
		try {
			// const res = signInWithEmailAndPassword(auth, email, password)
			// navigate('/')
		} catch (error) {
			const result = error as Error
			setError(result.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='flex flex-col text-secondary'>
			{isLoading && <FillLoading />}

			<h2 className='text-xl font-bold'>Login</h2>
			<div className='flex items-center justify-between space-x-5'>
				<p className=''>
					Don't have an account?{' '}
					<span
						className='cursor-pointer underline underline-offset-4'
						onClick={() => setAuth('register')}
					>
						Sign up
					</span>
				</p>
				<Link to={'/'} className='md: hover:underline underline-offset-4'>
					Back
				</Link>
			</div>

			{error && (
				<Alert variant='destructive'>
					<AlertCircle className='h-4 w-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-5'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
								<FormControl>
									<Input
										placeholder='example@gmail.com'
										disabled={isLoading}
										{...field}
										className='placeholder:text-white/75 text-white bg-transparent'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Password Filed */}

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='****'
										disabled={isLoading}
										{...field}
										className='placeholder:text-white/75 text-white bg-transparent'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div>
						<Button type='submit' className='h-12 w-full mt-2'>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default Login
