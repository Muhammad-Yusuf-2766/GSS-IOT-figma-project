import GatewayForm from '@/components/forms/Gateway_form'
import NodeForm from '@/components/forms/Node_form'
import Header from '@/dashboard/components/shared-dash/Header'
import { useState } from 'react'

const AddProduct = () => {
	const [availableNodes, setAvailableNodes] = useState([])

	return (
		<div className='w-full h-screen flex flex-col'>
			<Header />
			<div className='w-full h-full md:flex justify-center md:items-start mt-10 gap-3 p-3 pb-6 md:space-y-0 space-y-5'>
				<NodeForm />
				<GatewayForm nodes={availableNodes} />
				{/* <ActiveNodes nodes={availableNodes} /> */}
			</div>
		</div>
	)
}

export default AddProduct
