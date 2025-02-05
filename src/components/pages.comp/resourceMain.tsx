import DownloadBtns from '@/components/shared/downloadBtns'
import { resourceServices } from '@/constants'
import { useState } from 'react'

const ResourceMain = () => {
	const [selectedButton, setSelectedButton] = useState<
		(typeof resourceServices)[0]
	>(resourceServices[0])

	return (
		<div className='w-full h-full flex flex-col pt-5 md:pt-10'>
			<div className='w-full md:w-2/3 flex flex-col gap-y-5 md:gap-y-10 mx-auto px-4 md:px-0'>
				<h1 className='text-2xl md:text-4xl font-bold text-center md:text-left md:ml-10'>
					{selectedButton.title} <br /> {selectedButton.subtitle}
				</h1>
				<div className='w-full flex flex-col md:flex-row items-center gap-4 md:gap-10 mx-auto'>
					{resourceServices.map(button => (
						<button
							key={button.id}
							className={`w-full h-[50px] text-xs md:text-sm rounded-lg duration-300 ease-linear ${
								selectedButton?.id === button.id
									? 'bg-blue-800 text-gray-100'
									: 'bg-gray-300 text-gray-600 hover:bg-blue-800 hover:text-gray-100'
							}`}
							onClick={() => setSelectedButton(button)}
						>
							{button.title} <br /> {button.subtitle}
						</button>
					))}
				</div>
			</div>
			<div className='w-full mt-5 md:mt-10'>
				{selectedButton && (
					<div className='flex flex-col md:flex-row md:h-[600px] relative'>
						<img
							src={selectedButton.image || '/placeholder.svg'}
							alt='img'
							className='w-full md:w-2/3 h-48 md:h-full object-cover md:object-fill'
						/>
						<div className='w-full md:w-2/3 p-4 md:p-10 md:absolute md:border md:border-black/30 bg-white md:right-0 md:bottom-0 flex flex-col justify-center items-start'>
							<p className='text-base md:text-lg mb-4'>
								{selectedButton.description}
							</p>
							<DownloadBtns data={selectedButton} />
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default ResourceMain
