/* eslint-disable @typescript-eslint/no-explicit-any */
import { addBuildingSchema } from '@/lib/vatidation'
import { createBuildingRequest } from '@/services/apiRequests'
import { IGateway, IUser } from '@/types/interfaces'
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

interface BuildingFormProps {
	gateways: IGateway[]
	users: IUser[]
	refetch: () => void
}

const BuildingForm = ({ gateways, users, refetch }: BuildingFormProps) => {
	const [gatewayDropdownOpen, setGatewayDropdownOpen] = useState(false)
	const [userDropdownOpen, setUserDropdownOpen] = useState(false)
	const [selectedGateways, setSelectedGateways] = useState<string[]>([])
	const [selectedUsers, setSelectedUsers] = useState<string[]>([])
	const [error, setError] = useState('')

	const form = useForm<z.infer<typeof addBuildingSchema>>({
		resolver: zodResolver(addBuildingSchema),
		defaultValues: {
			building_name: '',
			building_addr: '',
			permit_date: '',
			expiry_date: '',
			gateway_sets: [], // yangi default values
			users: [],
		},
	})

	useEffect(() => {
		form.setValue('gateway_sets', selectedGateways)
	}, [selectedGateways, form])

	useEffect(() => {
		form.setValue('users', selectedUsers)
	}, [selectedUsers, form])

	const toggleGatewaySelection = (id: string) => {
		setSelectedGateways(prev => {
			return prev.includes(id) ? prev.filter(gw => gw !== id) : [...prev, id]
		})
	}

	const toggleUserSelection = (id: string) => {
		setSelectedUsers(prev => {
			return prev.includes(id)
				? prev.filter(user => user !== id)
				: [...prev, id]
		})
	}

	const onSubmit = async (values: z.infer<typeof addBuildingSchema>) => {
		try {
			if (values.gateway_sets?.length <= 0) {
				setError('최소 1개 게이트웨이를 선택해주세요')
				return
			}

			const resPromise = createBuildingRequest({
				...values,
				users: values.users ?? [],
				gateway_sets: values.gateway_sets ?? [],
			})

			toast.promise(resPromise, {
				loading: 'Loading...',
				success: res => {
					setTimeout(() => {
						// Formani reset qilish va dropdown-larni yangilash
						form.reset()

						setSelectedGateways([]) // Reset `selectedGateways`
						setSelectedUsers([]) // Reset `selectedUsers`
						refetch()
					}, 1000)
					return res.message
				},
				error: err => err.message || 'Something went wrong :(',
			})
		} catch (error: any) {
			toast.error(error.message || 'Something went wrong :(')
		}
	}
	return (
		<div className='md:w-[40%] flex justify-center items-center flex-col md:text-lg text-sm text-gray-500'>
			<h1 className='leading-none md:text-3xl text-xl font-bold text-gray-700 pb-2 mb-5 underline underline-offset-4'>
				현장 추가생성
			</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full p-4 border bg-white rounded-lg shadow-lg shadow-gray-300 flex flex-col mx-auto'
				>
					{/* Building Name */}
					<FormField
						control={form.control}
						name='building_name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>기업명</FormLabel>
								<FormControl>
									<Input
										type='text'
										// disabled={isLoading}
										{...field}
										className='border-gray-400 focus:border-transparent'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Building Number */}
					<FormField
						control={form.control}
						name='building_num'
						render={({ field }) => (
							<FormItem>
								<FormLabel>현장 No.</FormLabel>
								<FormControl>
									<Input
										type='number'
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

					{/* Building Address */}
					<FormField
						control={form.control}
						name='building_addr'
						render={({ field }) => (
							<FormItem>
								<FormLabel>현장 주소</FormLabel>
								<FormControl>
									<Input
										type='text'
										// disabled={isLoading}
										{...field}
										className='border-gray-400 focus:border-transparent'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Gateway Selection Dropdown */}
					<div className='mb-4'>
						<h3 className='text-[15px]'>게이트웨이 선택</h3>
						<span className={`text-red text-[15px]`}>{error}</span>
						<div className='relative'>
							<button
								type='button'
								className='w-full px-4 py-2 flex justify-between items-center bg-blue-700 text-white rounded-md text-[15px]'
								onClick={() => {
									setUserDropdownOpen(false)
									setGatewayDropdownOpen(!gatewayDropdownOpen)
								}}
							>
								게이트웨이 선택
								<svg
									className={`w-5 h-5 transform transition-transform ${
										gatewayDropdownOpen ? 'rotate-180' : ''
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

							{gatewayDropdownOpen && (
								<div className='mt-2 p-4 border border-gray-300 rounded-md bg-gray-200 absolute w-full z-10'>
									{(gateways?.length || 0) === 0 ? (
										<p className='text-[15px]'>사용불가(게이트웨이)</p>
									) : (
										gateways.map(gw => (
											<div key={gw._id} className='flex items-center mb-2'>
												<FormField
													control={form.control}
													name='gateway_sets'
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<input
																	{...field}
																	type='checkbox'
																	id={`gw-${gw.serial_number}`}
																	checked={selectedGateways.includes(gw._id)}
																	onChange={() =>
																		toggleGatewaySelection(gw._id)
																	}
																	className='border-gray-400 focus:border-transparent'
																/>
															</FormControl>
															<FormLabel>
																게이트웨이: {gw.serial_number}
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

					{/* User Selection Dropdown */}
					<div className='mb-4'>
						<h3 className='text-[15px]'>사용자 선택</h3>
						<div className='relative'>
							<button
								type='button'
								className='w-full px-4 py-2 flex justify-between items-center bg-blue-700 text-white rounded-md text-[15px]'
								onClick={() => setUserDropdownOpen(!userDropdownOpen)}
							>
								사용자 선택
								<svg
									className={`w-5 h-5 transform transition-transform ${
										userDropdownOpen ? 'rotate-180' : ''
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

							{userDropdownOpen && (
								<div className='mt-2 p-4 border border-gray-300 rounded-md bg-gray-200 absolute w-full z-10'>
									{(users?.length || 0) === 0 ? (
										<p className='text-[15px]'>No available users</p>
									) : (
										users.map(user => (
											<div key={user._id} className='flex items-center mb-2'>
												<input
													type='checkbox'
													id={`user-${user._id}`}
													checked={selectedUsers.includes(user._id)}
													onChange={() => toggleUserSelection(user._id)}
													className='mr-2'
												/>
												<label
													htmlFor={`user-${user._id}`}
													className='text-[15px]'
												>
													{user.user_name}
												</label>
											</div>
										))
									)}
								</div>
							)}
						</div>
					</div>

					{/* Permit Date */}
					<FormField
						control={form.control}
						name='permit_date'
						render={({ field }) => (
							<FormItem>
								<FormLabel>임대일.</FormLabel>
								<FormControl>
									<Input
										type='date'
										// disabled={isLoading}
										{...field}
										className='border-gray-400 focus:border-transparent w-fit'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Expiry Date */}
					<FormField
						control={form.control}
						name='expiry_date'
						render={({ field }) => (
							<FormItem>
								<FormLabel>만료일.</FormLabel>
								<FormControl>
									<Input
										type='date'
										// disabled={isLoading}
										{...field}
										className='border-gray-400 focus:border-transparent w-fit'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Submit Button */}
					<Button className='mt-5 py-5 mx-auto w-1/3' type='submit'>
						제출
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default BuildingForm
