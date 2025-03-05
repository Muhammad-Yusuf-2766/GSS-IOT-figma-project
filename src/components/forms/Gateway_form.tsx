/* eslint-disable @typescript-eslint/no-explicit-any */
import { addGatewaychema } from '@/lib/vatidation'
import { createGatewayRequest } from '@/services/apiRequests'
import { ICreateGateway, INode } from '@/types/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
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

interface GatewayFormProps {
	nodes: INode[]
	refetch: () => void
}

const GatewayForm = ({ nodes, refetch }: GatewayFormProps) => {
	const form = useForm<z.infer<typeof addGatewaychema>>({
		resolver: zodResolver(addGatewaychema),
		defaultValues: {
			selected_nodes: [],
		},
	})

	const { setValue, watch } = form

	// =============== Handle Node selection ============ //
	const handleSelectedNodes = () => {
		const inputNodes = form.getValues().nodes || ''

		// Vergul bilan ajratilgan raqamlarni massivga aylantiramiz
		const nodeNumbers = inputNodes
			.split(',')
			.map(num => Number(num.trim()))
			.filter(num => !isNaN(num)) // NaN bo'lganlarini olib tashlaymiz

		// nodes ichidan mos keladigan node'larni topamiz
		const selectedNodes = nodes
			.filter(node => nodeNumbers.includes(node.doorNum))
			.map(node => node._id)

		setValue('selected_nodes', selectedNodes, { shouldDirty: true })
	}

	// =============== Handle submit function ============ //
	const onSubmit = async (values: z.infer<typeof addGatewaychema>) => {
		try {
			const sendingData: ICreateGateway = {
				serial_number: values.serial_number,
				nodes: values.selected_nodes,
			}

			console.log(sendingData)

			const resPromise = createGatewayRequest(sendingData)
			toast.promise(resPromise, {
				loading: 'Loading...',
				success: res => {
					setTimeout(() => {
						form.reset({ nodes: '' })
						refetch()
					}, 1000)
					return res.message
				},
				error: err => {
					return err.message || 'Something went wrong :('
				},
			})
		} catch (error: any) {
			toast.error(error.message || 'Something went wrong :(')
		}
	}

	// Watch for changes to 'selected_nodes' to trigger re-render
	const selectedNodes = watch('selected_nodes', [])

	return (
		<div className='md:w-[40%] flex justify-center items-center flex-col md:text-lg text-sm text-gray-500'>
			<h1 className='leading-none text-xl font-bold text-gray-700 pb-2 mb-5 underline underline-offset-4'>
				게이트웨이 생성
			</h1>
			<Form {...form}>
				<form
					className='w-full h-auto p-4 pb-8 border bg-white rounded-lg shadow-lg shadow-gray-300 space-y-3'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<h4 className='text-center capitalize mb-4'>
						스마트가드 게이트웨이 No.
					</h4>
					<FormField
						control={form.control}
						name='serial_number'
						render={({ field }) => (
							<FormItem>
								<FormLabel>게이트웨이 No.</FormLabel>
								<FormControl>
									<Input
										type='text'
										{...field}
										value={field.value ?? ''}
										onChange={e => field.onChange(e.target.value)}
										className='border-gray-700 focus:border-transparent'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Yangi nodes input */}
					<FormField
						control={form.control}
						name='nodes'
						render={({ field }) => (
							<FormItem>
								<FormLabel>노드 번호 입력 (쉼표로 구분):</FormLabel>
								<FormControl>
									<Input
										type='text'
										{...field}
										value={field.value ?? ''}
										onChange={e => field.onChange(e.target.value)}
										placeholder='1,2,4,5'
										className='border-gray-700 focus:border-transparent'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='button'
						onClick={handleSelectedNodes}
						className='h-12 w-full mt-2'
					>
						노드 세트 확인
					</Button>

					<div className='mb-4'>
						<label className='block text-[16px] '>노드 선택:</label>
						{selectedNodes.length > 0 ? (
							<div className='flex flex-wrap'>
								{selectedNodes.map(nodeId => (
									<span key={nodeId} className='mr-4'>
										{nodeId}
									</span>
								))}
							</div>
						) : (
							<p>선택된 노드 없음</p>
						)}
					</div>

					<Button type='submit' className='h-12 w-full mt-2'>
						게이트웨이 생성
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default GatewayForm
