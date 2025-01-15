import { IResourceData } from '@/types/interfaces'
interface DownloadBtnsProps {
	data: IResourceData
}
const DownloadBtns: React.FC<DownloadBtnsProps> = ({ data }) => {
	return (
		<div className='flex sm:flex-row justify-center gap-20 mt-10 text-secondary'>
			<button className='flex items-center justify-center gap-2 bg-[#2c2f3f] px-8 py-3 rounded-full hover:bg-[#1a1c25] transition-colors'>
				Catalog Download
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 14l-7 7m0 0l-7-7m7 7V3'
					/>
				</svg>
			</button>
			{data.app && (
				<>
					<button className='flex items-center justify-center gap-2 bg-[#2c2f3f] px-8 py-3 rounded-full hover:bg-[#1a1c25] transition-colors'>
						App Download
						<svg
							className='w-5 h-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M19 14l-7 7m0 0l-7-7m7 7V3'
							/>
						</svg>
					</button>
				</>
			)}
		</div>
	)
}

export default DownloadBtns
