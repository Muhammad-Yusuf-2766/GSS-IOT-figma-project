import backgroundImage from '@/assets/pageBg3.jpg'
import PagesNavbar from '@/components/shared/pagesNavbar'
import { members } from '@/constants'
import { IMember, IResource } from '@/types/interfaces'
import { useParams } from 'react-router-dom'

export const MembersDetail: React.FC = () => {
	// URL parametrlardan ID olish
	const { memberId } = useParams<{ memberId: string }>()
	// ID asosida `member` ma'lumotini topish
	const member: IMember | undefined = members.find(
		m => m.id === parseInt(memberId || '')
	)
	if (!member) {
		return <div>Member not found!</div>
	}

	const resource: IResource = {
		img: backgroundImage,
		title: 'Community',
	}

	return (
		<>
			<PagesNavbar data={resource} />
			<div className='w-2/3 h-screen py-10 mx-auto'>
				<h2 className='text-5xl font-bold mb-4 text-center'>기업 구성원</h2>

				<div className='w-full h-full flex items-center'>
					<div className='w-full h-1/2 flex justify-center items-end gap-x-10 flex-shrink-0'>
						<img
							src={member.image}
							alt='member'
							className='border border-black/35 h-[400px] object-cover'
						/>
						<div className='w-full h-4/5 flex flex-col justify-between'>
							<div>
								<h1 className='text-4xl font-outfit font-semibold'>
									{member.role}
								</h1>
								<span>{member.name}</span>
							</div>

							<div className='w-1/3 h-[2px] bg-black' />
							<p className='text-xl '>{member.description}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
