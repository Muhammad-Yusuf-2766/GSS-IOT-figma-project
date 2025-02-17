/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { registerSchema } from '@/lib/vatidation'
import { registerRequest } from '@/services/apiRequests'
import { useAuthState } from '@/stores/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
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

const Register = () => {
	const { setAuth } = useAuthState()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			user_name: '',
			user_email: '',
			user_password: '',
			user_phone: 0,
			confirmPassword: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		setIsLoading(true)
		try {
			const { confirmPassword, ...dataToSend } = values

			const resPromise = registerRequest(dataToSend)
			toast.promise(resPromise, {
				loading: 'Loading...',
				success: res => {
					if (res.state === 'success') {
						setError('')
						setTimeout(() => {
							setIsLoading(false)
							setAuth('login')
						}, 1000)
						return 'Registered successfully!'
					}
					setIsLoading(false)
					throw new Error('Unexpected response structure')
				},
				error: err => {
					setIsLoading(false)
					const errorMessage = err.message || 'Something went wrong'
					setError(errorMessage) // Xatoni statega yozish
					return errorMessage
				},
			})
		} catch (error: any) {
			setError(error.message || 'Unexpected error occurred')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='flex flex-col text-secondary'>
			<h2 className='text-xl font-bold'>Register</h2>
			<div className='flex items-center justify-between'>
				<p className=''>
					Already have an account?{' '}
					<span
						className=' cursor-pointer underline underline-offset-4'
						onClick={() => setAuth('login')}
					>
						Login
					</span>
				</p>
				<Link to={'/'} className='underline underline-offset-4'>
					Back
				</Link>
			</div>

			{error && (
				<Alert className='text-red-600 py-2 mt-2' variant='default'>
					<AlertCircle className='h-4 w-4' color='red' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 mt-5 relative'
				>
					{/* FillLoading komponenti */}
					{isLoading && (
						<div className='absolute inset-0 flex items-center justify-center z-10'>
							<FillLoading />
						</div>
					)}
					{/* Name field */}
					<FormField
						control={form.control}
						name='user_name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>User name</FormLabel>
								<FormControl>
									<Input
										placeholder='User name'
										disabled={isLoading}
										{...field}
										className='placeholder:text-white/75 text-white bg-transparent'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Email field */}
					<FormField
						control={form.control}
						name='user_email'
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

					{/* Phone Filed */}

					<FormField
						control={form.control}
						name='user_phone'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input
										type='number'
										placeholder='01043257896'
										disabled={isLoading}
										{...field}
										className='placeholder:text-white/75 text-white bg-transparent no-spinner'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Password Filed */}

					<div className='grid grid-cols-2 gap-2'>
						<FormField
							control={form.control}
							name='user_password'
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

						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
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
					</div>

					<div>
						<Button
							type='submit'
							disabled={isLoading}
							className='h-12 w-full mt-2'
						>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default Register
