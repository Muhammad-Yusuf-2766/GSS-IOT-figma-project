import { LucideLoaderCircle } from 'lucide-react'

const FillLoading = () => {
	return (
		<div className='absolute inset-0 flex justify-center items-center w-full h-full z-50'>
			<LucideLoaderCircle className='animate-spin' size={40} />
		</div>
	)
}

export default FillLoading
