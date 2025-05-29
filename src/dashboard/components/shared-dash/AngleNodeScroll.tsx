import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const AngleNodeScroll = () => {
	const ArrayFn = (number: number): number[] => {
		const result = []
		for (let i = 0; i < number; i++) {
			result.push(i)
		}

		return result
	}

	return (
		<div className='grid grid-cols-12 w-full gap-4'>
			{/* Filtrlangan nodlar */}
			<ScrollArea className='max-h-[268px] md:col-span-9 col-span-12 order-2 md:order-1 overflow-auto w-full rounded-lg border border-slate-400 bg-white'>
				<div className='grid grid-cols-3 md:grid-cols-6 md:gap-4 gap-2 md:p-4 p-2'>
					{ArrayFn(20).map(item => (
						<Card key={item} className='border-slate-400 bg-blue-50'>
							<CardContent className='md:p-2 p-1 space-y-1 md:text-sm text-[10px] text-gray-600'>
								<h1 className='font-semibold text-gray-700'>노드 넘버: 150</h1>
								<p>Axis-X: 0.6</p>
								<p>Axis-Y: 0.9</p>
								<p>위치: S-4출구-12단</p>
							</CardContent>
						</Card>
					))}
				</div>
			</ScrollArea>

			{/* Xavfli nodlar */}
			<ScrollArea className='max-h-[268px] md:col-span-3 col-span-12 order-1 md:order-2 overflow-auto w-full rounded-lg border border-slate-400 bg-white'>
				<div className='md:gap-4 gap-2 md:p-4 p-2'>
					{ArrayFn(20).map((item, index) => (
						<div className='p-2 bg-red-400 border  rounded-md mb-2'>
							<p key={item} className='text-white text-[16px] '>
								{index + 1}. 150번 노드 위험성 높다. 확인 필수
							</p>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

export default AngleNodeScroll
