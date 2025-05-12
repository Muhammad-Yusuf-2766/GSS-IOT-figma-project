/* eslint-disable @typescript-eslint/no-explicit-any */
import { angleNodeSchema } from '@/lib/vatidation'
import { createAngleNodeRequest } from '@/services/apiRequests'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
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

// interface NodeFormProps {
// 	nodes?: INode[]
// 	refetch: () => void
// }

const AngleNodeForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const form = useForm<z.infer<typeof angleNodeSchema>>({
		resolver: zodResolver(angleNodeSchema),
	})

	const onSubmit = async (values: z.infer<typeof angleNodeSchema>) => {
		setIsLoading(true)
		try {
			const { angle_node_counts } = values

			// 1. Split and trim
			const rawNumbers = angle_node_counts.split('-').map(num => num.trim())

			// 2. Tekshiramiz: hammasi sonmi?
			if (
				rawNumbers.length !== 2 ||
				rawNumbers.some(num => isNaN(Number(num)))
			) {
				setIsLoading(false)
				setError('잘못된 형식입니다. 예: 1-8') // Xatolik xabari
				return
			}

			// 3. Raqamlarga aylantirib olamiz
			const angleNodeNumbers = rawNumbers.map(num => Number(num))

			// 4. Boshlanish raqami tugash raqamidan katta bo‘lsa, xato
			if (angleNodeNumbers[0] > angleNodeNumbers[1]) {
				setIsLoading(false)
				setError('시작 노드는 끝 노드보다 작거나 같아야 합니다.')
				return
			}

			// 5. Oraliqdagi sonlar massivini yasaymiz
			const angleNodes = []
			for (let i = angleNodeNumbers[0]; i <= angleNodeNumbers[1]; i++) {
				angleNodes.push(i)
			}

			const resPromise = createAngleNodeRequest(angleNodes)
			toast.promise(resPromise, {
				loading: 'Loading...',
				success: res => {
					setError('')
					setTimeout(() => {
						setIsLoading(false)
						form.reset({ angle_node_counts: '' })
						// refetch()
					}, 1000)
					return res.message
				},
				error: err => {
					setIsLoading(false)
					setError(err.message)
					return err.message || 'Something went wrong :('
				},
			})
		} catch (error: any) {
			setIsLoading(false)
			toast.error(error.message || 'Something went wrong :(')
		}
	}

	return (
		<div className='md:w-[30%] flex flex-col justify-center items-center md:text-lg text-sm text-gray-800 relative'>
			<h1 className='leading-none text-xl font-bold text-gray-700 pb-2 mb-5 underline underline-offset-4'>
				비계전도 노드 생성
			</h1>
			{isLoading && <p className='absolute inset-0'>Loading...</p>}
			{error && (
				<Alert className='text-red-600 py-2 mt-2' variant='destructive'>
					<AlertCircle className='h-4 w-4' color='red' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full h-auto p-4 border border-gray-400 bg-white rounded-lg shadow-lg shadow-gray-300 space-y-5'
				>
					<FormField
						control={form.control}
						name='angle_node_counts'
						render={({ field }) => (
							<FormItem>
								<FormLabel>노드 시작 과 끝 넘버 입력</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='예: 1-8'
										disabled={isLoading}
										{...field}
										value={field.value ?? ''}
										className='border-gray-700 focus:border-transparent placeholder:text-gray-400'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						disabled={isLoading}
						className='h-12 w-full mt-2'
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default AngleNodeForm
