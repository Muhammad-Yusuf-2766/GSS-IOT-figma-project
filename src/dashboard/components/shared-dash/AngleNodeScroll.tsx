import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { IAngleNode } from '@/types/interfaces'

interface Props {
	building_angle_nodes: IAngleNode[]
	dangerAngleNodes: IAngleNode[]
	onSelectNode: (doorNum: number) => void
}

const AngleNodeScroll = ({
	building_angle_nodes,
	dangerAngleNodes,
	onSelectNode,
}: Props) => {
	if (!building_angle_nodes?.length) {
		return (
			<div className='w-full py-7 border border-red-500 rounded-lg text-center text-red-500'>
				노드 정보가 없습니다.
			</div>
		) // fallback UI
	}

	return (
		<div className='grid grid-cols-12 w-full gap-4'>
			{/* Filtrlangan nodlar */}
			<ScrollArea className='max-h-[268px] md:col-span-9 col-span-12 order-2 md:order-1 overflow-auto w-full rounded-lg border border-slate-400 bg-white'>
				<div className='grid grid-cols-3 md:grid-cols-6 md:gap-4 gap-2 md:p-4 p-2'>
					{building_angle_nodes.map(item => (
						<Card
							key={item.doorNum}
							onClick={() => onSelectNode(item.doorNum)}
							className={`border border-slate-300 ${
								dangerAngleNodes.some(d => d.doorNum === item.doorNum)
									? 'bg-gradient-to-r from-red-100 to-red-300 hover:to-red-400'
									: 'bg-gradient-to-r from-blue-50 to-blue-200 hover:to-blue-300'
							} shadow-md hover:shadow-lg  transition duration-200 ease-in-out rounded-xl cursor-pointer`}
						>
							<CardContent className='p-4 space-y-2 text-sm text-gray-700'>
								<div className='flex items-center justify-between'>
									<h1 className='font-bold text-blue-700'>노드 넘버</h1>
									<span className='text-blue-800 font-semibold text-lg'>
										{item.doorNum}
									</span>
								</div>
								<div className='grid grid-cols-2 gap-x-4 gap-y-1'>
									<p className='font-medium text-gray-600'>Axis-X:</p>
									<p className='text-gray-800'>{item.angle_x}</p>

									<p className='font-medium text-gray-600'>Axis-Y:</p>
									<p className='text-gray-800'>{item.angle_y}</p>

									<p className='font-medium text-gray-600'>위치:</p>
									<p className='text-gray-800'>{item.position}</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</ScrollArea>

			{/* Xavfli nodlar */}
			<ScrollArea className='max-h-[268px] md:col-span-3 col-span-12 order-1 md:order-2 overflow-auto w-full rounded-lg border border-slate-400 bg-white'>
				<div className='md:gap-4 gap-2 md:p-4 p-2'>
					{/* {building_angle_nodes.filter(
						item => item.angle_x > 9 || item.angle_y > 9
					).length === 0 ? (
						<div className='p-2 bg-blue-500 border rounded-md mb-2'>
							<p className='text-center text-white text-[16px]'>
								지금 위험이 없습니다.
							</p>
						</div>
					) : (
						building_angle_nodes
							.filter(item => item.angle_x > 9 || item.angle_y > 9)
							.map((item, index) => (
								<div
									key={index}
									className='text-center p-2 bg-red-500 border rounded-md mb-2'
								>
									<p className='text-white text-[16px]'>
										{item.doorNum}번 노드 위험성 높다. 확인 필수
									</p>
								</div>
							))
					)} */}

					{dangerAngleNodes && dangerAngleNodes.length !== 0 ? (
						dangerAngleNodes.map(item => (
							<div
								key={item._id}
								className='text-center p-2 bg-red-500 border rounded-md mb-2'
							>
								<p className='text-white text-[16px]'>
									{item.doorNum}번 노드 위험성 높다. 확인 필수
								</p>
							</div>
						))
					) : (
						<div className='p-2 bg-blue-500 border rounded-md mb-2'>
							<p className='text-center text-white text-[16px]'>
								지금 위험이 없습니다.
							</p>
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	)
}

export default AngleNodeScroll
