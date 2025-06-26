/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineAngleNodeToGatewaySchema } from '@/lib/vatidation'
import {
	connectAngleNodesRequest,
	getSingleGateway,
} from '@/services/apiRequests'
import { IAngleNode } from '@/types/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'

interface AngleNodeFormProps {
	angle_nodes: IAngleNode[]
	refetchNodes: () => void
}

const AngleBuildingForm = ({
	angle_nodes,
	refetchNodes,
}: AngleNodeFormProps) => {
	const [isGatawaychecked, setIsGatawaychecked] = useState<boolean>(true)
	const [checkinAngleNodesNumber, setCheckinAngleNodesNumber] = useState<
		number[] | null
	>(null)

	const form = useForm<z.infer<typeof combineAngleNodeToGatewaySchema>>({
		resolver: zodResolver(combineAngleNodeToGatewaySchema),
	})
	const { setValue } = form

	// ===== Handle Gateway checking request ===== //
	const {
		data: gateway,
		dataUpdatedAt,
		isSuccess,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['singleGateway'],
		queryFn: () => {
			const currentGateway = form.getValues('gateway_number') || ''
			return getSingleGateway(currentGateway)
		},
		enabled: false, // avtomatik chaqirmaslik uchun
		refetchOnWindowFocus: false,
		retry: 1,
	})

	const handleGatewaychecking = async () => {
		if (form.getValues('gateway_number') === '') return
		refetch()
	}

	const handleReset = () => {
		form.reset()
		setIsGatawaychecked(true)
		setCheckinAngleNodesNumber(null)
	}

	// =============== Handle Node selection ============ //
	const handleSelectedNodes = () => {
		const inputNodes = form.getValues().angle_nodes || ''

		// Vergul bilan ajratilgan raqamlarni massivga aylantiramiz
		const nodeNumbers = inputNodes
			.split(',')
			.map(num => Number(num.trim()))
			.filter(num => !isNaN(num)) // NaN bo'lganlarini olib tashlaymiz

		// nodes ichidan mos keladigan node'larni topamiz
		const selectedNodes = angle_nodes
			.filter(node => nodeNumbers.includes(node.doorNum))
			.map(node => node._id)

		const selectedNodesNumber = angle_nodes
			.filter(node => nodeNumbers.includes(node.doorNum))
			.map(node => node.doorNum)

		setCheckinAngleNodesNumber(selectedNodesNumber)

		setValue('selected_nodes', selectedNodes, { shouldDirty: true })
	}

	useEffect(() => {
		if (isSuccess) {
			setIsGatawaychecked(false)
			form.setValue('gateway_id', gateway._id)
		}
		if (isError) {
			setIsGatawaychecked(true)
		}
	}, [isSuccess, isError, dataUpdatedAt, form, gateway?._id])

	// =============== Handle submit function ============ //
	const onSubmit = async (
		values: z.infer<typeof combineAngleNodeToGatewaySchema>
	) => {
		try {
			const sendingData = {
				angle_nodes: values.selected_nodes,
				gateway_id: values.gateway_id,
				serial_number: gateway.serial_number,
			}

			console.log('sendingData', sendingData)
			const resPromise = connectAngleNodesRequest(sendingData)
			toast.promise(resPromise, {
				loading: 'Loading...',
				success: res => {
					setTimeout(() => {
						form.reset()
						refetchNodes()
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const selectedNodes = watch('selected_nodes')

	return (
		<div className='md:w-[40%] flex justify-center items-center flex-col md:text-lg text-sm text-gray-700'>
			<h1 className='leading-none text-xl font-bold  pb-2 mb-5 underline underline-offset-4'>
				비계전도 노드를 건물에 연결하기
			</h1>
			<Form {...form}>
				<form
					className='w-full h-auto p-4 pb-8 border border-gray-400 bg-white text-gray-700 rounded-lg shadow-lg shadow-gray-300 space-y-3'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{isError && (
						<p className='text-red-500 text-sm mt-1'>
							게이트웨이를 찾을 수 없습니다. 번호를 확인해주세요.
						</p>
					)}

					{/* Gateway for Angle-Node checking input */}
					<div className='w-full flex gap-x-2 items-end'>
						<div className='flex-grow'>
							<FormField
								control={form.control}
								name='gateway_number'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											게이트웨이 번호 입력:{' '}
											<span className='text-blue-600'>
												(입력후 버튼을 눌으세요)
											</span>
										</FormLabel>
										<FormControl>
											<Input
												type='text'
												{...field}
												disabled={!isGatawaychecked}
												value={field.value ?? ''}
												onChange={e => field.onChange(e.target.value)}
												placeholder='예: 0003'
												className='w-full border-gray-700 focus:border-transparent'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<Button
							type='button'
							disabled={!isGatawaychecked}
							onClick={handleGatewaychecking}
							className={`h-9 w-fit ${!isGatawaychecked && 'bg-green-500'}`}
						>
							{!isGatawaychecked ? '✓ checked' : '게이트웨이 확인'}
						</Button>
						{!isGatawaychecked && (
							<Button type='button' onClick={handleReset} className={`w-fit `}>
								reset
							</Button>
						)}
					</div>

					{/* Combining Angle-Nodes input */}
					<div className='w-full flex gap-x-2 items-end'>
						<div className='flex-grow'>
							<FormField
								control={form.control}
								name='angle_nodes'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											노드 번호 입력:{' '}
											<span className='text-blue-600'>
												{' '}
												(쉼표로 구분) - (입력후 버튼을 눌으세요)
											</span>{' '}
										</FormLabel>
										<FormControl>
											<Input
												type='text'
												{...field}
												disabled={isGatawaychecked}
												value={field.value ?? ''}
												onChange={e => field.onChange(e.target.value)}
												placeholder='예: 1,2,4,5'
												className='w-full border-gray-700 focus:border-transparent'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<Button
							type='button'
							disabled={isGatawaychecked}
							onClick={handleSelectedNodes}
							className='h-9 w-fit'
						>
							선택한 노드 확인
						</Button>
					</div>

					{/* Selected Angle-Nodes View field */}
					<div className='mb-4 text-sm '>
						<label className='flex items-center gap-x-5 text-gray-700'>
							노드 선택:{' '}
							{checkinAngleNodesNumber ? (
								<p className=''>
									{`${
										checkinAngleNodesNumber && checkinAngleNodesNumber.length
									}`}{' '}
									개 노드 선택함
								</p>
							) : (
								''
							)}
						</label>
						{checkinAngleNodesNumber && checkinAngleNodesNumber.length > 0 && (
							<div className='flex flex-wrap mt-2'>
								{checkinAngleNodesNumber.map(nodeNumber => (
									<span
										key={nodeNumber}
										className='py-1 px-2 bg-blue-500 mr-2 text-white rounded'
									>
										{nodeNumber}
									</span>
								))}
							</div>
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

export default AngleBuildingForm
