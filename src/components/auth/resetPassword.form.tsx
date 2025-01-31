import {
	resetPasswordSchemaStep1,
	resetPasswordSchemaStep2,
} from '@/lib/vatidation'
import {
	resetPasswordRequest,
	resetPasswordVerifyRequest,
} from '@/services/apiRequests'
import { useAuthState } from '@/stores/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import FillLoading from '../shared/fill-laoding'
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

const ResetPassword = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [step, setStep] = useState(1) // 1-bosqichda boshlanadi
	const [savedEmail, setSavedEmail] = useState('') // Emailni saqlash
	const { setAuth } = useAuthState()

	// 1-form: faqat email
	const formStep1 = useForm<z.infer<typeof resetPasswordSchemaStep1>>({
		resolver: zodResolver(resetPasswordSchemaStep1),
		defaultValues: { user_email: '' },
	})

	// 2-form: otp va new_password
	const formStep2 = useForm<z.infer<typeof resetPasswordSchemaStep2>>({
		resolver: zodResolver(resetPasswordSchemaStep2),
		defaultValues: { user_email: savedEmail, otp: 0, new_password: '' }, // ✅ Emailni saqlash
	})

	// 1️⃣ - Email yuborish
	const handleEmailSend = async (
		values: z.infer<typeof resetPasswordSchemaStep1>
	) => {
		setIsLoading(true)
		try {
			const resPromise = resetPasswordRequest(values)
			toast.promise(resPromise, {
				loading: 'Loading...',
				success: res => {
					if (res.state === 'success') {
						setSavedEmail(values.user_email) // Emailni saqlash

						setTimeout(() => {
							setStep(2) // 2-bosqichga o‘tish
							formStep2.reset({ user_email: values.user_email }) // ✅ Reset form to include email
							setIsLoading(false)
						}, 500)
						return res.message
					}
					setIsLoading(false)
				},
				error: err => {
					setIsLoading(false)

					return err.message
				},
			})
		} catch (error: any) {
			toast.error(error.message || 'Error on sending OTP code')
			setIsLoading(false)
		}
	}

	// 2️⃣ - OTP va yangi parolni yuborish
	const handleResetPassword = async (
		values: z.infer<typeof resetPasswordSchemaStep2>
	) => {
		setIsLoading(true)
		try {
			const resPromise = resetPasswordVerifyRequest({
				...values,
				user_email: savedEmail, // Emailni backendga yuborish
			})
			toast.promise(resPromise, {
				loading: 'Loading...',
				success: res => {
					if (res.state === 'success') {
						setTimeout(() => {
							setAuth('login')
							setIsLoading(false)
						}, 1000)
						return res.message
					}
					setIsLoading(false)
					throw new Error(res.message)
				},
				error: err => {
					setIsLoading(false)
					return err.message
				},
			})
		} catch (error: any) {
			toast.error(error.message)
			setIsLoading(false)
		}
	}

	return (
		<div className='flex flex-col text-secondary'>
			<h2 className='text-xl font-bold mb-2'>Reset Password</h2>

			{/* 1️⃣ Email Form */}
			{step === 1 && (
				<Form {...formStep1}>
					<form
						onSubmit={formStep1.handleSubmit(handleEmailSend)}
						className='space-y-8 mt-5 relative'
					>
						<FormField
							control={formStep1.control}
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
						{isLoading && <FillLoading />}

						<div>
							<Button
								type='submit'
								className='h-12 w-full mt-2'
								disabled={isLoading}
							>
								Send Code
							</Button>
						</div>
					</form>
				</Form>
			)}

			{/* 2️⃣ OTP va New Password Form */}
			{step === 2 && (
				<Form {...formStep2}>
					<form
						onSubmit={formStep2.handleSubmit(handleResetPassword)}
						className='space-y-8 mt-5 relative'
					>
						<FormField
							control={formStep2.control}
							name='otp'
							render={({ field }) => (
								<FormItem>
									<FormLabel>OTP Code</FormLabel>
									<FormControl>
										<Input
											type='number'
											placeholder='428563'
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
							control={formStep2.control}
							name='new_password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
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

						{isLoading && <FillLoading />}

						<div>
							<Button
								type='submit'
								className='h-12 w-full mt-2'
								disabled={isLoading}
							>
								Submit
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	)
}

export default ResetPassword
