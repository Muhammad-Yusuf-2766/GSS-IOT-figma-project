import { members } from '@/constants'
import { IMember } from '@/types/interfaces'
import { useParams } from 'react-router-dom'
import DetailPageHeader from '../shared/detailPageHeader'

const MembersDetail: React.FC = () => {
	// URL parametrlardan ID olish
	const { memberId } = useParams<{ memberId: string }>()
	// ID asosida `member` ma'lumotini topish
	const member: IMember | undefined = members.find(
		m => m.id === parseInt(memberId || '')
	)
	if (!member) {
		return <div>Member not found!</div>
	}

	return (
		<>
			<DetailPageHeader />
			<div className='w-2/3 min-h-screen py-10 mx-auto'>
				<h2 className='text-4xl font-bold mb-6 text-center'>기업 구성원</h2>

				{/* Responsive Grid */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-center'>
					{/* Image */}
					<img
						src={member.image}
						alt='member'
						className='border border-black/35 h-[400px] w-full object-cover rounded-lg'
					/>

					{/* Content */}
					<div className='space-y-6 md:col-span-2'>
						<div>
							<h1 className='text-4xl font-semibold'>{member.role}</h1>
							<span className='text-lg text-gray-700'>{member.name}</span>
						</div>

						{/* Divider */}
						<div className='h-[2px] w-1/3 bg-black' />

						{/* Description */}
						<p className='text-lg text-gray-800'>{member.description}</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default MembersDetail
