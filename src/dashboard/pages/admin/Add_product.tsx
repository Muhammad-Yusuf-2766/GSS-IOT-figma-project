import GatewayForm from '@/components/forms/Gateway_form'
import NodeForm from '@/components/forms/Node_form'
import ActiveNodes from '@/dashboard/components/pages-comps/Active_nodes'
import Header from '@/dashboard/components/shared-dash/Header'
import { getActiveNodes } from '@/services/apiRequests'
import { useQuery } from '@tanstack/react-query'

const AddProduct = () => {
	const { data, refetch } = useQuery({
		queryKey: ['get-active-nodes'],
		queryFn: getActiveNodes,
		// enabled: !users || users.length === 0, // bu muhim!!!: users mavjud bo'lganda qayta so'rov yubormaydi.
		retry: 1,
	})

	return (
		<div className='w-full h-screen flex flex-col'>
			<Header />
			<div className='w-full h-full md:flex justify-center md:items-start mt-10 gap-3 p-3 pb-6 md:space-y-0 space-y-5'>
				<NodeForm refetch={refetch} />
				<GatewayForm refetch={refetch} nodes={data} />
				<ActiveNodes nodes={data} />
			</div>
		</div>
	)
}

export default AddProduct
