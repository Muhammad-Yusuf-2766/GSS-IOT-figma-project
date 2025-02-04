import { ITotalCountBoxProps } from '@/types/interfaces'
import React from 'react'

const TotalCountBox: React.FC<{ data: ITotalCountBoxProps }> = ({ data }) => {
	const { itemName, clients, icon } = data
	return (
		<div className='flex items-center justify-center gap-x-4 bg-white shadow-xl shadow-gray-200  border border-slate-400 font-medium rounded-lg text-xl px-5 py-3 text-center'>
			<div className=''>{icon}</div>총 {itemName} 수: {clients?.length}
		</div>
	)
}

export default TotalCountBox
