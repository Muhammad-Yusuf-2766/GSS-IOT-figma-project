import { members } from '@/constants'
import { MoveRight } from 'lucide-react'

import { useState } from 'react'
import { Link } from 'react-router-dom'
const CompanyMembers = () => {
	const [hoveredMember, setHoveredMember] = useState<number | null>()

	return (
		<div className='w-full min-h-screen bg-white p-8'>
			<div className='max-w-6xl mx-auto md:relative'>
				<div className='md:flex justify-between items-start mb-16'>
					<h1 className='text-3xl font-bold'>기업 구성원</h1>
				</div>

				<div className='h-full md:relative md:h-[600px] flex justify-center'>
					{/* Kartalarni dinamik generatsiya qilish */}
					<div className='h-auto md:flex flex flex-col space-y-5	'>
						{members.slice(0, 3).map(member => (
							<>
								<div
									key={member.id}
									className={`md:absolute md:w-[350px] md:h-[450px] w-[300px] h-[400px] group cursor-pointer transition-all duration-400 ${
										hoveredMember === member.id ? 'z-50 scale-105' : 'z-10'
									}`}
									style={{
										left: member.position.left,
										top: member.position.top,
									}}
									onMouseEnter={() => setHoveredMember(member.id)}
									onMouseLeave={() => setHoveredMember(null)}
								>
									<div className='relative h-full overflow-hidden rounded-xl hover:rounded-none'>
										<img
											src={member.image}
											alt={member.name}
											className='w-full h-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
										<div className='absolute bottom-0 left-0 p-8 text-white'>
											<h3 className='text-2xl font-bold mb-2'>{member.role}</h3>
											<p className='text-gray-300'>{member.name}</p>
										</div>
									</div>
								</div>
								<div className='w-fit h-10 text-foreground md:flex flex-col justify-between items-end absolute md:right-5 md:top-1/2 hover:underline underline-offset-4 group z-10 hidden'>
									<div className='w-2/3 h-[1px] bg-black -mr-10' />
									<Link
										to={'/community'}
										className=' flex items-center gap-2 text-foreground'
									>
										View All Members
										<MoveRight className='' />
									</Link>
								</div>
							</>
						))}
						<Link
							to={'/community'}
							className='md:hidden w-full flex items-center justify-self-center gap-2 text-foreground hover:underline underline-offset-4'
						>
							View All Members
							<MoveRight className='' />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CompanyMembers
