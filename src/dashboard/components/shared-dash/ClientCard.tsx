import { Button } from '@/components/ui/button'
import { IClient } from '@/types/interfaces'
import { FaTrash } from 'react-icons/fa'
import { FaArrowRightLong } from 'react-icons/fa6'
import { ImSpinner9 } from 'react-icons/im'
import { MdEdit } from 'react-icons/md'
import { TbXboxX } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const ClientCard: React.FC<{
	client: IClient
	onDelete: (id: string) => void
}> = ({ client, onDelete }) => {
	const navigate = useNavigate()

	const handleRedirect = () => {
		navigate(`${client._id}/buildings`)
	}

	const handleEdit = () => {
		alert(`이 기능이 아직 개발중입니다!`) // Formga yo'naltirish
	}

	return (
		<div className='p-6 rounded-xl bg-white shadow-xl shadow-gray-200 border border-slate-400 text-gray-600'>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-lg font-semibold'>{client.client_name}</h2>
			</div>
			<div className='space-y-4'>
				<div className='flex items-center justify-between'>
					<span>총 건물</span>
					<span className='flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700'>
						{client.client_buildings.length}
					</span>
				</div>
				<div className='flex items-center justify-between'>
					<span>회사 상태</span>
					<span className='flex items-center justify-center w-8 h-8 text-blue-700'>
						{client.client_status ? (
							<ImSpinner9 size={25} className='animate-spin text-blue-500' />
						) : (
							<TbXboxX size={30} color='red' />
						)}
					</span>
				</div>
				<div className='flex items-center justify-between'>
					<span>주소</span>
					<span className='px-3 py-1 rounded-full bg-blue-700 text-white text-sm'>
						{client.client_addr}
					</span>
				</div>
				<div className='mt-6 w-full flex justify-between'>
					<Button
						variant={'ghost'}
						onClick={handleRedirect}
						className='w-fit flex items-center justify-center gap-x-3 hover:bg-blue-100 bg-blue-50 '
					>
						<span className='md:flex text-gray-500'>건물 보기</span>

						<FaArrowRightLong size={20} className='text-blue-500 ' />
					</Button>
					<div className='flex gap-1'>
						<Button
							onClick={handleEdit}
							className='flex items-center justify-center hover:bg-blue-100 bg-blue-50 gap-x-3 text-gray text-blue-500'
							aria-label='Edit client'
						>
							<MdEdit size={18} />
						</Button>
						<Button
							onClick={() =>
								confirm(
									`이 ${client.client_name} 클라이언트를 삭제 하시겠습니까?`
								) && onDelete(client._id)
							}
							className='flex items-center justify-center gap-x-3 hover:bg-blue-100 bg-blue-50 text-gray text-red-500'
							aria-label='Delete client'
						>
							<FaTrash size={15} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ClientCard
