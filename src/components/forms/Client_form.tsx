/* eslint-disable @typescript-eslint/no-explicit-any */
import { addClientSchema } from '@/lib/vatidation'
import { createClientRequest } from '@/services/apiRequests'
import { IBuilding, IUser } from '@/types/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
interface IClientFormProps {
	buildings: IBuilding[]
	users: IUser[]
	refetch: () => void
}
const ClientForm = ({ users, buildings, refetch }: IClientFormProps) => {
	// State to manage the visibility of the dropdown
	const [userDropdownOpen, setUserDropdownOpen] = useState(false)
	const [buildigDropdownOpen, setBuildingDropdownOpen] = useState(false)
	const [selectedUsers, setSelectedUsers] = useState<string[]>([])
	const [selectedBuildings, setSelectedBuildings] = useState<string[]>([])

	const form = useForm<z.infer<typeof addClientSchema>>({
		resolver: zodResolver(addClientSchema),
		defaultValues: {
			client_name: '',
			client_addr: '',
		},
	})

	useEffect(() => {
		form.setValue('client_buildings', selectedBuildings)
	}, [selectedBuildings, form])

	useEffect(() => {
		form.setValue('boss_users', selectedUsers) // form.setValue ni useEffect ichida chaqirish
	}, [selectedUsers, form])

	const toggleBuildingSelection = (id: string) => {
		setSelectedBuildings(prev => {
			return prev.includes(id)
				? prev.filter(building => building !== id)
				: [...prev, id]
		})
	}

	const toggleUserSelection = (id: string) => {
		setSelectedUsers(prev => {
			return prev.includes(id)
				? prev.filter(user => user !== id)
				: [...prev, id]
		})
	}

	const onSubmit = async (values: z.infer<typeof addClientSchema>) => {
		try {
			const resPromise = createClientRequest(values)

			toast.promise(resPromise, {
				loading: 'Loading...',
				success: res => {
					setTimeout(() => {
						form.reset()
						setSelectedBuildings([])
						setSelectedUsers([])
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

	return (
		<div className='md:w-[40%] flex justify-center items-center flex-col md:text-lg text-sm text-gray-500'>
			<h1 className='leading-none text-xl font-bold text-gray-700 pb-2 mb-5 underline underline-offset-4'>
				클라이언트 추가
			</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full p-4 border bg-white rounded-lg shadow-lg shadow-gray-300 flex flex-col mx-auto'
				>
					{/* Client Company */}
					<FormField
						control={form.control}
						name='client_name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>현장대표</FormLabel>
								<FormControl>
									<Input
										type='text'
										// disabled={isLoading}
										{...field}
										className='border-gray-400 focus:border-transparent'
									/>
								</FormControl>
								{/* <FormMessage /> */}
							</FormItem>
						)}
					/>

					{/* Buildings Addresses */}
					<FormField
						control={form.control}
						name='client_addr'
						render={({ field }) => (
							<FormItem>
								<FormLabel>기업주소</FormLabel>
								<FormControl>
									<Input
										type='text'
										// disabled={isLoading}
										{...field}
										className='border-gray-400 focus:border-transparent'
									/>
								</FormControl>
								{/* <FormMessage /> */}
							</FormItem>
						)}
					/>

					{/* Buildings Selection Dropdown */}
					<div className='mb-4'>
						<h3 className='text-[15px]'>현장 선택:</h3>
						<div className='relative'>
							<button
								type='button'
								onClick={() => {
									setUserDropdownOpen(false)
									setBuildingDropdownOpen(!buildigDropdownOpen)
								}}
								className='w-full px-4 py-2 flex justify-between items-center bg-blue-700 text-white rounded-md text-[15px]'
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
													name='client_buildings'
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<input
																	{...field}
																	type='checkbox'
																	id={`user-${building._id}`}
																	checked={selectedBuildings.includes(
																		building._id
																	)}
																	onChange={() =>
																		toggleBuildingSelection(building._id)
																	}
																	className='border-gray-400 focus:border-transparent'
																/>
															</FormControl>
															<FormLabel>
																빌딩딩: {building.building_name}-
																{building.building_num}
															</FormLabel>
															{/* <FormMessage /> */}
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
								onClick={() => setUserDropdownOpen(!userDropdownOpen)}
								className='w-full px-4 py-2 flex justify-between items-center bg-blue-700 text-white rounded-md text-[15px]'
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
										<p className='text-[15px]'>사용불가 ( 사용자 )</p>
									) : (
										users.map((user, index) => (
											<div key={index} className='flex items-center mb-2'>
												<FormField
													control={form.control}
													name='boss_users'
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<input
																	{...field}
																	type='checkbox'
																	id={`user-${user._id}`}
																	checked={selectedUsers.includes(user._id)}
																	onChange={() => toggleUserSelection(user._id)}
																	className='border-gray-400 focus:border-transparent'
																/>
															</FormControl>
															<FormLabel>사용자: {user.user_name}</FormLabel>
															{/* <FormMessage /> */}
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

					{/* Submit Button */}
					<Button className='mt-5 py-5 mx-auto w-1/3' type='submit'>
						제출
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default ClientForm
