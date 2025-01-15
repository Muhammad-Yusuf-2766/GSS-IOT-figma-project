import { Link } from 'react-router-dom'

import { GatewaysCard, NodesCard } from '@/components/pages.comp/productsCard'
import Header from '../../components/shared-dash/Header'

const Products = () => {
	return (
		<div className='w-full h-full'>
			<Header />
			<div className='w-full flex flex-col md:h-2/3 items-center justify-center md:gap-y-3'>
				<div className='flex justify-center mt-4'>
					<h1 className='leading-none md:text-3xl text-xl font-bold text-gray-700 pb-2 underline underline-offset-4'>
						제품 리스트
					</h1>
				</div>
				<div className='w-full grid grid-cols-1 md:flex items-center gap-6 max-w-7xl mx-auto my-4'>
					<Link
						to={`${
							import.meta.env.VITE_REACT_BASE_URL
						}/admin/dashboard/product/gateways`}
						className='md:w-1/2'
					>
						<GatewaysCard />
					</Link>

					<Link
						to={`${
							import.meta.env.VITE_REACT_BASE_URL
						}/admin/dashboard/product/nodes`}
						className='md:w-1/2'
					>
						<NodesCard />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Products
