import { IGateway, INode } from '@/types/interfaces'

interface IProps {
	itemName: string
	item: IGateway[] | INode[]
	handleNodeStatus?: () => void
}

const FilteredTotalCnt = ({ itemName, item, handleNodeStatus }: IProps) => {
	const itemArray = Array.isArray(item) ? item : []

	return (
		<div className=''>
			<div className='w-full md:px-6 py-2 flex items-center justify-between gap-2 bg-blue-900 text-white mx-auto md:text-lg text-sm '>
				<div className='flex px-2 gap-2'>
					총 <span className='md:flex hidden'>{itemName}</span> : {''}
					{itemArray.length}
				</div>
				<span className='flex items-center gap-2 px-2'>
					<div className='w-5 h-5 rounded-full bg-green-500 mx-auto animate-pulse' />
					사용중 <span className='md:flex hidden'>{itemName}</span>: {''}
					{itemArray.filter(node => node.product_status === false).length}
				</span>
				<div className=' px-2 flex items-center gap-2'>
					<div className='w-5 h-5 rounded-full bg-red-500 mx-auto animate-pulse' />
					<span className='md:flex hidden'>{itemName}</span> 재고: {''}
					{itemArray.filter(node => node.product_status === true).length}
				</div>
				<button
					type='button'
					className='flex gap-1 px-3 md:py-2 py-1 rounded-full border border-white text-sm'
					onClick={handleNodeStatus}
				>
					<span className='md:flex hidden'>{itemName}</span> 초기화
				</button>
			</div>
		</div>
	)
}

export default FilteredTotalCnt
