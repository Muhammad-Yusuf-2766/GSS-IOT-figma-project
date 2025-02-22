/* eslint-disable @typescript-eslint/no-explicit-any */
import GeneralError from '@/components/errors/api.errors'
import FillLoading from '@/components/shared/fill-laoding'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Header from '@/dashboard/components/shared-dash/Header'
import { useUsersList } from '@/hooks/useUsersData'
import { deleteUser, updateUserTypes } from '@/services/apiRequests'
import { useUsersStore } from '@/stores/usersStore'
import { IUpdateUserType } from '@/types/interfaces'
import React, { useState } from 'react'
import { toast } from 'sonner'

type Thead = string

const tHead: Thead[] = [
	'이름',
	'이메일',
	'전화번호',
	'유형',
	'상태 변경',
	'관리자',
	'삭제',
]

export default function UserTable() {
	const { isLoading, error, refetch } = useUsersList()
	const { users } = useUsersStore()
	const [expandedRow, setExpandedRow] = useState<string | null>(null)

	const updateUserType = async (updatingData: IUpdateUserType) => {
		try {
			await updateUserTypes(updatingData)
			toast.success('User type changed successfully!')
			refetch()
		} catch (error: any) {
			toast(error.message || 'Error on updating user type')
		}
	}

	const handleDelete = async (user_id: string) => {
		try {
			await deleteUser(user_id)
			toast.error('User deleted successfully!')
			refetch()
		} catch (error: any) {
			toast(error.message || 'Error on deleting user')
		}
	}

	return (
		<div className='w-full h-full'>
			<Header />
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h1 className='text-2xl font-bold text-gray-700 my-4'>모든 사용자들</h1>
				<ScrollArea className='w-full h-[calc(100vh-200px)] relative'>
					{error && (
						<div className='absolute inset-0 flex justify-center items-center'>
							<GeneralError
								message='Error'
								error={error}
								variant='destructive'
							/>
						</div>
					)}
					<div className='min-w-full'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-blue-800 sticky top-0'>
								<tr>
									{tHead.map(head => (
										<th
											key={head}
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden md:table-cell'
										>
											{head}
										</th>
									))}
									<th
										scope='col'
										className='md:hidden px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'
									>
										사용자 정보
									</th>
								</tr>
							</thead>
							{isLoading ? (
								<tbody>
									<tr>
										<td colSpan={tHead.length + 1}>
											<FillLoading />
										</td>
									</tr>
								</tbody>
							) : users && users.length > 0 ? (
								<tbody className='bg-white divide-y divide-gray-200'>
									{users.map(user => (
										// Bu React fragment div yoki boshqa html tag ishlatilmasligi va <> body </> ishlatilishi krak bo'lgan joyda ishlatiladi.
										<React.Fragment key={user._id}>
											<tr key={user._id} className='hover:bg-gray-50'>
												<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden md:table-cell'>
													{user.user_name}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell'>
													{user.user_email}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell'>
													{user.user_phone}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell'>
													{user.user_type}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm font-medium hidden md:table-cell'>
													<Button
														onClick={() =>
															updateUserType({
																user_id: user._id,
																user_type:
																	user.user_type === 'CLIENT'
																		? 'USER'
																		: 'CLIENT',
															})
														}
														variant={
															user.user_type === 'CLIENT'
																? 'secondary'
																: 'default'
														}
													>
														상태변경
													</Button>
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm font-medium hidden md:table-cell'>
													<Button
														onClick={() =>
															updateUserType({
																user_id: user._id,
																user_type: 'ADMIN',
															})
														}
														disabled={user.user_type === 'ADMIN'}
														variant={
															user.user_type === 'ADMIN' ? 'outline' : 'default'
														}
													>
														Admin 추가
													</Button>
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm font-medium hidden md:table-cell'>
													<Button
														onClick={() =>
															confirm(
																`${user.user_name} 사용자를 삭제 하시겠습니까 ?`
															) && handleDelete(user._id)
														}
														variant='destructive'
													>
														삭제
													</Button>
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm font-medium md:hidden'>
													<div className='flex items-center justify-between'>
														<span className='font-medium text-gray-900 mr-2'>
															{user.user_name}
														</span>
														<Button
															onClick={() =>
																setExpandedRow(
																	expandedRow === user._id ? null : user._id
																)
															}
															variant='outline'
															size='sm'
														>
															{expandedRow === user._id ? '접기' : '펼치기'}
														</Button>
													</div>
												</td>
											</tr>
											{expandedRow === user._id && (
												<tr className='md:hidden'>
													<td colSpan={tHead.length + 1}>
														<div className='px-6 py-4 space-y-2'>
															<p>
																<strong>이메일:</strong> {user.user_email}
															</p>
															<p>
																<strong>전화번호:</strong> {user.user_phone}
															</p>
															<p>
																<strong>유형:</strong> {user.user_type}
															</p>
															<div className='space-y-2'>
																<Button
																	onClick={() =>
																		updateUserType({
																			user_id: user._id,
																			user_type:
																				user.user_type === 'CLIENT'
																					? 'USER'
																					: 'CLIENT',
																		})
																	}
																	variant={
																		user.user_type === 'CLIENT'
																			? 'secondary'
																			: 'default'
																	}
																	className='w-full'
																>
																	상태변경
																</Button>
																<Button
																	onClick={() =>
																		updateUserType({
																			user_id: user._id,
																			user_type: 'ADMIN',
																		})
																	}
																	disabled={user.user_type === 'ADMIN'}
																	variant={
																		user.user_type === 'ADMIN'
																			? 'outline'
																			: 'default'
																	}
																	className='w-full'
																>
																	Admin 추가
																</Button>
																<Button
																	onClick={() =>
																		confirm(
																			`${user.user_name} 사용자를 삭제 하시겠습니까 ?`
																		) && handleDelete(user._id)
																	}
																	variant='destructive'
																	className='w-full'
																>
																	삭제
																</Button>
															</div>
														</div>
													</td>
												</tr>
											)}
										</React.Fragment>
									))}
								</tbody>
							) : (
								<tbody>
									<tr>
										<td
											colSpan={tHead.length + 1}
											className='text-center text-gray-500 py-4'
										>
											No users found
										</td>
									</tr>
								</tbody>
							)}
						</table>
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</div>
		</div>
	)
}
