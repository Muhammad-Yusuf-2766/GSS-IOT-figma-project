import { auth } from '@/firebase'
import { useUserState } from '@/stores/user.auth.store'
import {
	DropdownMenuGroup,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { Dumbbell, LogOut, LucideLoader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from '../ui/dropdown-menu'

const UserBox = () => {
	const { user, setUser } = useUserState()
	const navigate = useNavigate()

	const onLogout = () => {
		auth.signOut().then(() => {
			setUser(null)
			navigate('/auth')
		})
	}

	if (!user) return <LucideLoader2 className='animate-spin' />
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user.photoURL!} />
					<AvatarFallback className='uppercase'>
						{user.email![0]}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-80'
				align='start'
				alignOffset={11}
				forceMount
			>
				<div className='flex flex-col space-y-4 p-2'>
					<p className='text-xs font-medium leading-none text-muted-foreground'>
						{user.email}
					</p>

					<div className='flex items-center gap-x-2'>
						<div className='rounded-md bg-secondary p-1'>
							<Avatar>
								<AvatarImage src={user.photoURL!} />
								<AvatarFallback className='uppercase'>
									{user.email![0]}
								</AvatarFallback>
							</Avatar>
						</div>
						<div className='space-y-1'>
							<p className='line-clamp-1 text-sm '>
								{user.displayName ?? user.email}
							</p>
						</div>
					</div>
				</div>

				<DropdownMenuSeparator className='h-[1px] bg-gray-500 my-3' />
				<DropdownMenuGroup>
					<DropdownMenuItem className='cursor-pointer'>
						<Dumbbell className='mr-2' />
						<span>Gym </span>
					</DropdownMenuItem>
					<DropdownMenuItem className='cursor-pointer' onClick={onLogout}>
						<LogOut size={26} className='mr-2' />
						<span>Logout </span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserBox
