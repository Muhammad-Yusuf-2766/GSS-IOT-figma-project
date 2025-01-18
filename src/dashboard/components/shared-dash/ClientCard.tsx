import { IClient } from '@/types/interfaces'
import { ImSpinner9 } from 'react-icons/im'
import { TbXboxX } from 'react-icons/tb'

const ClientCard: React.FC<{ client: IClient }> = ({ client }) => {
	return (
		<div className='p-6 rounded-xl bg-white shadow-xl shadow-gray-200 cursor-pointer hover:shadow-gray-400 border border-slate-400'>
			<h2 className='text-lg font-semibold mb-6'>Hyundai Engineering</h2>
			<div className='space-y-4'>
				<div className='flex items-center justify-between'>
					<span className='text-gray-600'>총 건물</span>
					<span className='flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700'>
						{client.buildings.length}
					</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-gray-600'>회사 상태태</span>
					<span className='flex items-center justify-center w-8 h-8  text-blue-700'>
						{client.status ? (
							<ImSpinner9 size={25} className='animate-spin text-blue-500' />
						) : (
							<TbXboxX size={30} color='red' />
						)}
					</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-gray-600'>주소</span>
					<span className='px-3 py-1 rounded-full bg-blue-700 text-white text-sm'>
						{client.company_addr}
					</span>
				</div>
			</div>
		</div>
	)
}

export default ClientCard
