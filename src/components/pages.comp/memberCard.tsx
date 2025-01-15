import { IMember } from '@/types/interfaces'
import React from 'react'
import { Link } from 'react-router-dom'
interface MemberProps {
	member: IMember
}
const MemberCard: React.FC<MemberProps> = ({ member }) => {
	return (
		<>
			<Link
				to={`/community/${member.id}`}
				key={member.id}
				className='relative bg-gray-200 shadow-[1px_0px_12px_2px_rgba(0,_0,_0,_0.2)] hover:scale-105 transition-transform duration-300 mt-5 overflow-hidden cursor-pointer'
			>
				{/* Background Image with Gradient */}
				<div
					className='md:h-[350px] h-[250px] w-full bg-cover bg-center'
					style={{
						backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0, 0, 0, 0.5)), url(${member.image})`,
					}}
				></div>
				{/* Info Section */}
				<div className='absolute bottom-4 left-4 text-white'>
					<h3 className='text-xl font-semibold'>{member.role}</h3>
					<p className='text-sm italic'>{member.name}</p>
				</div>
			</Link>
		</>
	)
}

export default MemberCard
