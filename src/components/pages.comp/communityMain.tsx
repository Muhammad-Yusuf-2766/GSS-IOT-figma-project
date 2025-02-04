import { members } from '@/constants'
import MemberCard from './memberCard'

export const CommunityMain: React.FC = () => {
	return (
		<div className='w-full flex justify-center'>
			<div className='md:w-4/6 w-full text-center py-10 md:px-0 px-3'>
				<h2 className='text-5xl font-bold mb-8'>기업 구성원</h2>
				<div className='w-full md:grid-cols-3 grid grid-cols-2 gap-6 mx-auto'>
					{members.map(member => (
						<MemberCard key={member.id} member={member} />
					))}
				</div>
			</div>
		</div>
	)
}
