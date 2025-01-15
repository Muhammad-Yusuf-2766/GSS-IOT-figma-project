import { serviceData } from '@/constants'
import { useState } from 'react'

const HomeService = () => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	return (
		<div className='w-full h-[70vh] text-secondary'>
			<div className='h-1/2 flex items-center bg-blue-950 pl-14 font-oswald font-bold text-2xl'>
				<h1 className=''>
					매일 새로운 하루를 <br /> GSS 기업과 함게
				</h1>
			</div>

			<div className='w-full h-1/2 bg-white md:p-14 p-4'>
				{/* Main content */}
				<div className='w-full h-full flex flex-col justify-end items-end'>
					{/* Image Grid */}
					<div className='md:w-[70%] w-full grid grid-cols-3 md:gap-5 gap-2'>
						{serviceData.map((service, index) => (
							<div
								key={index}
								className='col-span-1 cursor-pointer'
								onClick={() => setSelectedIndex(index)}
							>
								{selectedIndex === index && (
									<h3 className='w-full border-t pt-5 text-white text-center'>
										{service.serviceName}
									</h3>
								)}
								<img
									src={service.img}
									alt='Construction workers'
									className='w-[300px] h-[200px] object-cover hover:scale-105 transition-transform duration-300 mt-5'
								/>
							</div>
						))}
					</div>
					{/* Download Buttons */}
					<div className='md:w-[70%] w-full flex justify-center  md:gap-20 gap-5 mt-10'>
						<button className='flex items-center justify-center gap-2 bg-[#2c2f3f] px-8 md:py-3 py-0 rounded-full hover:bg-[#1a1c25] transition-colors'>
							App <span className='md:block hidden'>Download</span>
							<svg
								className='md:w-5 h-5'
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
						<button className='flex items-center justify-center gap-2 bg-[#2c2f3f] px-8 md:py-3 p-1 rounded-full hover:bg-[#1a1c25] transition-colors'>
							Catalog <span className='md:block hidden'>Download</span>
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
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomeService
