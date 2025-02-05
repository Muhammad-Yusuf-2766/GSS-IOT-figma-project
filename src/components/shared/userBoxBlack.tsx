import { logoutRequest } from '@/services/apiRequests'
import { useUserState } from '@/stores/user.auth.store'
import {
	DropdownMenuGroup,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { LogOut, LucideLoader2 } from 'lucide-react'
import { useState } from 'react'
import { AiOutlineProduct } from 'react-icons/ai'
import { LuUser } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from '../ui/dropdown-menu'

const UserBoxBlack = () => {
	const { user, clearUser } = useUserState()
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const onLogout = async () => {
		setIsLoading(true)
		try {
			const resPromise = logoutRequest()
			toast.promise(resPromise, {
				loading: 'Loading...',
				success: () => {
					setTimeout(() => {
						clearUser()
						window.location.reload()
					}, 2000) // Toast 3 soniya davomida ko'rinadi, keyin sahifa reload bo'ladi
					return 'Logout successfully!'
				},
				error: err => {
					const errorMessage = err.message || 'Something went wrong'
					return errorMessage
				},
			})

			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			console.error('Something went wrong:', error)
		}
	}

	if (!user || isLoading) return <LucideLoader2 className='animate-spin' />

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Link
					to={''}
					className='hover:underline underline-offset-4 border-x-[3px] border-gray-900 px-5 rounded-lg'
				>
					{user.user_name}
				</Link>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-48 bg-[#2a4967]'
				align='start'
				alignOffset={11}
				forceMount
			>
				<div className='flex flex-col space-y-4 p-2'>
					<p className='text-xs font-medium leading-none text-white'>
						{user.user_email}
					</p>

					<div className='flex items-center gap-x-2'>
						<div className='text-[14px] font-medium leading-none text-white'>
							{user.user_name}
						</div>
					</div>
				</div>

				<DropdownMenuSeparator className='h-[1px] bg-white my-3 text-white' />
				<DropdownMenuGroup className='text-[12px]'>
					<DropdownMenuItem
						className='cursor-pointer text-white'
						onClick={() => navigate('/admin/dashboard')}
					>
						<AiOutlineProduct className='mr-2 ' />
						<span className=''>대시보드 </span>
					</DropdownMenuItem>
					<DropdownMenuItem
						className='cursor-pointer text-white'
						onClick={() => navigate('/my-page')}
					>
						<LuUser size={26} className='mr-2' />
						<span>마이페이지 </span>
					</DropdownMenuItem>
					<DropdownMenuItem
						className='cursor-pointer text-white'
						onClick={onLogout}
					>
						<LogOut size={26} className='mr-2' />
						<span>로그아웃 </span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserBoxBlack
