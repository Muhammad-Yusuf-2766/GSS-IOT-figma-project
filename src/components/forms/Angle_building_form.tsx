/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectNodeBuildingchema } from '@/lib/vatidation'
import { connectAngleNodesRequest } from '@/services/apiRequests'
import { IBuilding, INode } from '@/types/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
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

interface IClientFormProps {
	buildings: IBuilding[]
	angle_nodes: INode[]
	refetch: () => void
}

const AngleBuildingForm = ({
	buildings,
	angle_nodes,
	refetch,
}: IClientFormProps) => {
	const [buildigDropdownOpen, setBuildingDropdownOpen] = useState(false)
	const [selectedBuilding, setSelectedBuilding] = useState<string>('')

	const form = useForm<z.infer<typeof connectNodeBuildingchema>>({
		resolver: zodResolver(connectNodeBuildingchema),
	})

	const { setValue, watch } = form

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

		setValue('selected_nodes', selectedNodes, { shouldDirty: true })
	}

	const handleBuildingSelect = (id: string) => {
		setSelectedBuilding(id)
	}

	// =============== Handle submit function ============ //
	const onSubmit = async (values: z.infer<typeof connectNodeBuildingchema>) => {
		try {
			const sendingData = {
				angle_nodes: values.angle_nodes,
				building_id: values.building_id,
			}
			const resPromise = connectAngleNodesRequest(sendingData)
			toast.promise(resPromise, {
				loading: 'Loading...',
				success: res => {
					setTimeout(() => {
						form.reset()
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
	const selectedNodes = watch('selected_nodes')

	useEffect(() => {
		form.setValue('building_id', selectedBuilding)
	}, [selectedBuilding, form])

	return (
		<div className='md:w-[40%] flex justify-center items-center flex-col md:text-lg text-sm text-gray-500'>
			<h1 className='leading-none text-xl font-bold text-gray-700 pb-2 mb-5 underline underline-offset-4'>
				비계전도 노드를 건물에 연결하기
			</h1>
			<Form {...form}>
				<form
					className='w-full h-auto p-4 pb-8 border border-gray-400 bg-white rounded-lg shadow-lg shadow-gray-300 space-y-3'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{/* Yangi nodes input */}
					<FormField
						control={form.control}
						name='angle_nodes'
						render={({ field }) => (
							<FormItem>
								<FormLabel>노드 번호 입력 (쉼표로 구분):</FormLabel>
								<FormControl>
									<Input
										type='text'
										{...field}
										value={field.value ?? ''}
										onChange={e => field.onChange(e.target.value)}
										placeholder='예: 1,2,4,5'
										className='border-gray-700 focus:border-transparent'
									/>
								</FormControl>
								{/* <FormMessage /> */}
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

					<div className='mb-4 text-sm '>
						<label className='flex items-center gap-x-5 text-green-700 text-lg'>
							노드 선택:{' '}
							{selectedNodes ? (
								<p className=''>
									{`${selectedNodes && selectedNodes.length}`} 개 노드 선택함
								</p>
							) : (
								''
							)}
						</label>
						{selectedNodes?.length > 0 && (
							<div className='flex flex-wrap'>
								{selectedNodes.map(nodeId => (
									<span key={nodeId} className='mr-4'>
										{nodeId}
									</span>
								))}
							</div>
						)}
					</div>

					{/* Buildings Selection Dropdown */}
					<div className='mb-4 text-sm'>
						<div className='relative'>
							<button
								type='button'
								onClick={() => {
									setBuildingDropdownOpen(!buildigDropdownOpen)
								}}
								className='w-full px-4 py-2 flex justify-between items-center bg-blue-600 text-white rounded-md text-[15px]'
							>
								현장 선택
								<svg
									className={`w-5 h-5 transform transition-transform ${
										buildigDropdownOpen ? 'rotate-180' : ''
									}`}
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M19 9l-7 7-7-7'
									/>
								</svg>
							</button>

							{buildigDropdownOpen && (
								<div className='mt-2 p-4 border border-gray-300 rounded-md bg-gray-200 absolute w-full z-10'>
									{(buildings?.length || 0) === 0 ? (
										<p className='text-[15px]'>사용불가 ( 건물 )</p>
									) : (
										buildings.map((building, index) => (
											<div key={index} className='flex items-center mb-2'>
												<FormField
													control={form.control}
													name='building_id'
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<input
																	{...field}
																	type='radio'
																	checked={selectedBuilding === building._id}
																	onChange={() =>
																		handleBuildingSelect(building._id)
																	}
																	className='border-gray-400 focus:border-transparent'
																/>
															</FormControl>
															<FormLabel className='text-gray-600'>
																{'  '} {building.building_name}-
																{building.building_num}
															</FormLabel>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										))
									)}
								</div>
							)}
						</div>
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
