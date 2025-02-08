/* eslint-disable @typescript-eslint/no-explicit-any */
import GeneralError from '@/components/errors/api.errors'
import FillLoading from '@/components/shared/fill-laoding'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Header from '@/dashboard/components/shared-dash/Header'
import { useUsersList } from '@/hooks/useUsersData'
import { deleteUser, updateUserTypes } from '@/services/apiRequests'
import { useUsersStore } from '@/stores/usersStore'
import { IUpdateUserType } from '@/types/interfaces'
import { toast } from 'sonner'

type Thead = string

const tHead: Thead[] = [
	'사용자 이름',
	'사용자 이메일',
	'사용자 유형',
	'변경',
	'Admin 추가',
	'삭제',
]

export default function UserTable() {
	const { isLoading, error, refetch } = useUsersList()
	const { users } = useUsersStore()

	const updateUserType = async (updatingData: IUpdateUserType) => {
		await updateUserTypes(updatingData)
			.then(() => {
				toast.success('User type changed successfully!')
				refetch()
			})
			.catch(error => {
				toast.error(error.message || 'Error on deleting-user')
			})
	}

	const handleDelete = async (user_id: string) => {
		try {
			await deleteUser(user_id)
			toast.success('deleted successfully!')
			refetch()
		} catch (error: any) {
			toast.error(error.message || 'Error on deleting-user')
		}
	}

	return (
		<div className='w-full h-full'>
			<Header />
			<div className='grid grid-cols-1 max-w-7xl mx-auto'>
				<h1 className='leading-none md:text-2xl text-xl font-bold text-gray-700 pb-2 my-2'>
					모든 사용자들
				</h1>
				<ScrollArea className='w-full md:h-[570px] h-[550px] relative'>
					{error && (
						<div className='absolute inset-0 flex justify-center items-center w-1/2 mx-auto'>
							<GeneralError
								message='Error'
								error={error}
								variant='destructive'
							/>
						</div>
					)}
					<table className='w-full text-sm text-center text-gray-500'>
						<thead className='md:h-12 sticky top-0 text-white font-bold text-xs uppercase bg-blue-800'>
							<tr>
								{tHead.map(head => (
									<th
										key={head}
										scope='col'
										className='w-fit px-4 border-x border-gray-400'
									>
										{head}
									</th>
								))}
							</tr>
						</thead>
						{isLoading ? (
							// Agar yuklanayotgan bo'lsa, butun `<tbody>` o'rniga shunchaki biror `<tr>` qaytariladi
							<tbody>
								<tr>
									<td colSpan={tHead.length}>
										<FillLoading />
									</td>
								</tr>
							</tbody>
						) : users && users.length > 0 ? (
							<tbody className='text-center'>
								{users &&
									users.map(user => (
										<tr
											key={user._id}
											className='border border-slate-400 hover:bg-gray-100'
										>
											<th
												scope='row'
												className='md:px-4 py-2 font-medium text-gray-900 whitespace-nowrap'
											>
												{user.user_name}
											</th>
											<td className='md:px-4 px-2 py-2 border-x border-gray-400 '>
												{user.user_email}
											</td>
											<td className='md:px-4 px-2 py-2 border-x border-gray-400'>
												{user.user_type}
											</td>
											<td className='md:px-4 px-2 py-2 border-x border-gray-400 text-center'>
												{user.user_type === 'CLIENT' ? (
													<button
														onClick={() =>
															updateUserType({
																user_id: user._id,
																user_type: 'USER',
															})
														}
														className='border py-1 px-2 rounded-md bg-gray-500 text-white hover:bg-gray-600'
													>
														상태변경
													</button>
												) : (
													<button
														onClick={() =>
															updateUserType({
																user_id: user._id,
																user_type: 'CLIENT',
															})
														}
														className='border py-1 px-2 rounded-md bg-blue-800 text-white hover:bg-blue-900'
													>
														상태 변경
													</button>
												)}
											</td>
											<td className='md:px-4 px-2 py-2 border-x border-gray-400 text-center'>
												<button
													onClick={() =>
														updateUserType({
															user_id: user._id,
															user_type: 'ADMIN',
														})
													}
													disabled={user.user_type === 'ADMIN'}
													className={`border py-1 px-2 rounded-md ${
														user.user_type === 'ADMIN'
															? 'bg-gray-500'
															: 'bg-green-500 hover:bg-green-600'
													} text-white`}
												>
													Admin 추가
												</button>
											</td>
											<td className='md:px-4 px-2 py-2 border-x border-gray-400 text-center'>
												<button
													onClick={() =>
														confirm(
															`${user.user_name} 사용자를 삭제 하시겠습니까 ?`
														) && handleDelete(user._id)
													}
													className='border py-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-600'
												>
													삭제
												</button>
											</td>
										</tr>
									))}
							</tbody>
						) : (
							<tbody>
								<tr>
									<td
										colSpan={tHead.length}
										className='text-center text-gray-500 py-4'
									>
										No users found
									</td>
								</tr>
							</tbody>
						)}
					</table>

					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</div>
		</div>
	)
}
