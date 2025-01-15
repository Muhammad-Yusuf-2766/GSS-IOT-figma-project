import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import Header from '@/dashboard/components/shared-dash/Header'
import { User } from '@/types/interfaces'
import { useState } from 'react'

type Thead = string

const tHead: Thead[] = [
	'사용자 이름',
	'사용자 이메일',
	'사용자 유형',
	'변경',
	'Admin 추가',
	'삭제',
]

const initialUsers: User[] = [
	{ id: '1', name: 'John Doe', email: 'john@example.com', type: 'User' },
	{ id: '2', name: 'Jane Smith', email: 'jane@example.com', type: 'User' },
	{ id: '3', name: 'John Doe', email: 'john@example.com', type: 'User' },
	{ id: '4', name: 'Jane Smith', email: 'jane@example.com', type: 'User' },
	{ id: '5', name: 'John Doe', email: 'john@example.com', type: 'Client' },
	{ id: '6', name: 'Jane Smith', email: 'jane@example.com', type: 'Client' },
	{ id: '7', name: 'John Doe', email: 'john@example.com', type: 'Client' },
	{ id: '8', name: 'Jane Smith', email: 'jane@example.com', type: 'Client' },
	{ id: '9', name: 'John Doe', email: 'john@example.com', type: 'Client' },
	{ id: '10', name: 'Alice Johnson', email: 'alice@example.com', type: 'User' },
	{ id: '11', name: 'Bob Williams', email: 'bob@example.com', type: 'Client' },
	{
		id: '12',
		name: 'Charlie Brown',
		email: 'charlie@example.com',
		type: 'Admin',
	},
]

export default function UserTable() {
	const [users, setUsers] = useState<User[]>(initialUsers)

	const handleMakeClient = (userId: string) => {
		setUsers(
			users.map(user =>
				user.id === userId ? { ...user, type: 'Client' } : user
			)
		)
	}

	const handleMakeUser = (userId: string) => {
		setUsers(
			users.map(user => (user.id === userId ? { ...user, type: 'User' } : user))
		)
	}

	const handleMakeAdmin = (userId: string) => {
		setUsers(
			users.map(user =>
				user.id === userId ? { ...user, type: 'Admin' } : user
			)
		)
	}

	const handleDelete = (userId: string) => {
		setUsers(users.filter(user => user.id !== userId))
	}

	return (
		<div className='w-full h-full'>
			<Header />

			<div className='grid grid-cols-1 max-w-7xl mx-auto'>
				<h1 className='leading-none md:text-2xl text-xl font-bold text-gray-700 pb-2 my-2'>
					모든 사용자들
				</h1>
				{/* <div className='w-full md:max-h-[570px] max-h-[90vh] overflow-y-auto'> */}
				<ScrollArea className='w-full md:h-[570px] h-[550px] px-4'>
					<table className='w-full text-sm text-center rtl:text-right text-gray-500'>
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
						<tbody className='text-center'>
							{users.map(user => (
								<tr
									key={user.id}
									className='border border-slate-400 hover:bg-gray-100'
								>
									<th
										scope='row'
										className='md:px-4 py-3 font-medium text-gray-900 whitespace-nowrap'
									>
										{user.name}
									</th>
									<td className='md:px-4 px-2 py-3 border-x border-gray-400 '>
										{user.email}
									</td>
									<td className='md:px-4 px-2 py-3 border-x border-gray-400'>
										{user.type}
									</td>
									<td className='md:px-4 px-2 py-3 border-x border-gray-400 text-center'>
										{user.type === 'Client' ? (
											<button
												onClick={() => handleMakeUser(user.id)}
												className='border py-2 md:px-4 px-2 rounded-md bg-gray-500 text-white hover:bg-gray-600'
											>
												상태변경
											</button>
										) : (
											<button
												onClick={() => handleMakeClient(user.id)}
												className='border py-2 md:px-4 px-2 rounded-md bg-blue-700 text-white hover:bg-blue-800'
											>
												상태 변경
											</button>
										)}
									</td>
									<td className='md:px-4 px-2 py-3 border-x border-gray-400 text-center'>
										<button
											onClick={() => handleMakeAdmin(user.id)}
											disabled={user.type === 'Admin'}
											className={`border py-2 md:px-4 px-2 rounded-md ${
												user.type === 'Admin'
													? 'bg-gray-500'
													: 'bg-green-500 hover:bg-green-600'
											} text-white`}
										>
											Admin 추가
										</button>
									</td>
									<td className='md:px-4 px-2 py-3 border-x border-gray-400 text-center'>
										<button
											onClick={() =>
												confirm(`${user.name} 사용자를 삭제 하시겠습니까 ?`) &&
												handleDelete(user.id)
											}
											className='border py-2 md:px-4 px-2 rounded-md bg-red-500 text-white hover:bg-red-600'
										>
											삭제
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>

				{/* </div> */}
			</div>
		</div>
	)
}
