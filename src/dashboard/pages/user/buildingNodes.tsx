import BuildingNodes from '@/dashboard/components/shared-dash/buildingNodes'
import { useUserState } from '@/stores/user.auth.store'

export const ClientHeader = () => {
	const { user } = useUserState()

	return (
		<div className='w-full h-auto md:flex grid grid-cols-2 justify-between items-center px-4 py-2 border-slate-400 border-b md:text-2xl text-sm'>
			{user && (
				<div className=''>
					<h1 className='font-bold text-gray-700'>환영합니다!</h1>
					<p className='font-semibold text-gray-700'>
						GSS-GROUP 클라이언트{' '}
						<span className='md:text-xl font-bold text-blue-800'>
							{' '}
							{user?.user_name}
						</span>
					</p>
				</div>
			)}
		</div>
	)
}

const ClientBuildingNodes = () => {
	return (
		<div className='w-full h-full'>
			<ClientHeader />
			<BuildingNodes />
		</div>
	)
}

export default ClientBuildingNodes
