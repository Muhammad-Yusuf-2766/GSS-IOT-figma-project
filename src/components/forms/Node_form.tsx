/* eslint-disable @typescript-eslint/no-explicit-any */
import { addNodeSchema } from '@/lib/vatidation'
import { createNodeRequest } from '@/services/apiRequests'
import { INode } from '@/types/interfaces'
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

interface NodeFormProps {
	nodes?: INode[]
	refetch: () => void
}

const NodeForm = ({ refetch }: NodeFormProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const form = useForm<z.infer<typeof addNodeSchema>>({
		resolver: zodResolver(addNodeSchema),
	})

	// ...

	const onSubmit = async (values: z.infer<typeof addNodeSchema>) => {
		setIsLoading(true)
		try {
			const { startNumber, endNumber } = values
			if (startNumber > endNumber) {
				setIsLoading(false)
				setError('시작 노드는 끝 노드보다 작거나 같아야 합니다.')
				return
			}
			const nodes = []
			for (let i = startNumber; i <= endNumber; i++) {
				const node = { doorNum: i }
				nodes.push(node)
			}

			const resPromise = createNodeRequest(nodes)
			toast.promise(resPromise, {
				loading: 'Loading...',
				success: res => {
					setError('')
					setTimeout(() => {
						setIsLoading(false)
						form.reset({ startNumber: 0, endNumber: 0 })
						refetch()
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
		<div className='md:w-[30%] flex flex-col justify-center items-center md:text-lg text-sm text-gray-800'>
			<h1 className='leading-none text-xl font-bold text-gray-700 pb-2 mb-5 underline underline-offset-4'>
				노드 생성
			</h1>
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
					className='w-full h-[400px] flex flex-col justify-around items-center p-4 border bg-white rounded-lg shadow-lg shadow-gray-300'
				>
					<h4 className='text-center capitalize mb-4'>스마트가드 노드 No.</h4>
					<FormField
						control={form.control}
						name='startNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>노드 시작넘버:</FormLabel>
								<FormControl>
									<Input
										type='number'
										disabled={isLoading}
										{...field}
										value={field.value ?? ''}
										onChange={e => {
											const num = parseFloat(e.target.value)
											field.onChange(isNaN(num) ? '' : num)
										}}
										className='border-gray-700 focus:border-transparent'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='endNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>노드 끝넘버:</FormLabel>
								<FormControl>
									<Input
										type='number'
										disabled={isLoading}
										{...field}
										value={field.value ?? ''}
										onChange={e => {
											const num = parseFloat(e.target.value)
											field.onChange(isNaN(num) ? '' : num)
										}}
										className='border-gray-700 focus:border-transparent'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						disabled={isLoading}
						// className='h-12 w-full mt-2'
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default NodeForm
