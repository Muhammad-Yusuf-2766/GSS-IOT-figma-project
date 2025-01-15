import DownloadBtns from '@/components/shared/downloadBtns'
import { resourceServices } from '@/constants'
import { useState } from 'react'

const ResourceMain = () => {
	const [selectedButton, setSelectedButton] = useState<
		(typeof resourceServices)[0]
	>(resourceServices[0])

	return (
		<>
			<div className='w-full h-full fex flex-col pt-10'>
				<div className='w-2/3 flex flex-col gap-y-10 mx-auto'>
					<h1 className='text-4xl font-bold ml-10'>
						{selectedButton.title} <br /> {selectedButton.subtitle}
					</h1>
					<div className='w-full flex items-center gap-10 mx-auto'>
						{resourceServices.map(button => (
							<button
								key={button.id}
								className={`w-full h-[50px] text-sm rounded-lg duration-300 ease-linear ${
									selectedButton?.id === button.id
										? 'bg-blue-800 text-gray-100'
										: 'bg-gray-300 text-gray-600 hover:bg-blue-800 hover:text-gray-100'
								}`}
								onClick={() => setSelectedButton(button)} // Bosilganda state yangilanadi
							>
								{button.title} <br /> {button.subtitle}
							</button>
						))}
					</div>
				</div>
				{/* Pastki div: faqat tanlangan tugma ma'lumotlari ko'rsatiladi */}
				<div className='w-full h-[600px] relative mt-10'>
					{selectedButton && (
						<>
							<img
								src={selectedButton.image}
								alt='img'
								className='w-2/3 h-full absolute top-0 left-0 object-fill'
							/>
							<div className='w-2/3 h-[300px] px-10 absolute border border-black/30  bg-white right-0 bottom-0 flex flex-col justify-center items-start'>
								<p className='text-lg'>{selectedButton.description}</p>
								{/* Buttons */}
								<DownloadBtns data={selectedButton} />
							</div>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default ResourceMain
