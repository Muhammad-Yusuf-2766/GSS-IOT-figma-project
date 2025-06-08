import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { IAngleNode } from '@/types/interfaces'

interface Props {
	building_angle_nodes: IAngleNode[]
}

const AngleNodeScroll = ({ building_angle_nodes }: Props) => {
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
						<Card key={item.doorNum} className='border-slate-400 bg-blue-50'>
							<CardContent className='md:p-2 p-1 space-y-1 md:text-sm text-[10px] text-gray-600'>
								<h1 className='font-semibold text-gray-700'>
									노드 넘버: {item.doorNum}
								</h1>
								<p>Axis-X: {item.angle_x}</p>
								<p>Axis-Y: {item.angle_y}</p>
								<p>위치: {item.position}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</ScrollArea>

			{/* Xavfli nodlar */}
			<ScrollArea className='max-h-[268px] md:col-span-3 col-span-12 order-1 md:order-2 overflow-auto w-full rounded-lg border border-slate-400 bg-white'>
				<div className='md:gap-4 gap-2 md:p-4 p-2'>
					{building_angle_nodes.map((item, index) => (
						<div key={index} className='p-2 bg-red-400 border  rounded-md mb-2'>
							<p className='text-white text-[16px] '>
								{index + 1}. {item.doorNum}번 노드 위험성 높다. 확인 필수
							</p>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

export default AngleNodeScroll
