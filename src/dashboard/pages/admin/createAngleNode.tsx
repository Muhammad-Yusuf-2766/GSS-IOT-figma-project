import AngleBuildingForm from '@/components/forms/Angle_building_form'
import AngleNodeForm from '@/components/forms/Angle_node_form'
import ActiveNodes from '@/dashboard/components/pages-comps/Active_nodes'
import Header from '@/dashboard/components/shared-dash/Header'
import { getActiveAngleNodes, getGateways } from '@/services/apiRequests'
import { useQueries } from '@tanstack/react-query'

const CreateAngleNode = () => {
	const queryData = useQueries({
		queries: [
			{
				queryKey: ['get-active-angle-nodes'],
				queryFn: getActiveAngleNodes,
				retry: 1,
				// enabled: false,
			},
			{
				queryKey: ['get-gateways'],
				queryFn: getGateways,
				retry: 1,
				enabled: false,
			},
		],
	})

	// Ma'lumotlarni olish
	const activeAngleNodes = queryData[0].data
	const refetch = queryData[0].refetch

	return (
		<div className='w-full h-screen flex flex-col'>
			<Header />
			<div className='w-full h-full md:flex justify-center md:items-start mt-10 gap-3 p-3 pb-6 md:space-y-0 space-y-5'>
				<AngleNodeForm />
				<AngleBuildingForm
					refetchNodes={refetch}
					angle_nodes={activeAngleNodes}
				/>
				<ActiveNodes nodes={activeAngleNodes} />
			</div>
		</div>
	)
}

export default CreateAngleNode
