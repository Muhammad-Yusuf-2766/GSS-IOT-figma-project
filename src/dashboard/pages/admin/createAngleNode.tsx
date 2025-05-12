import AngleBuildingForm from '@/components/forms/Angle_building_form'
import AngleNodeForm from '@/components/forms/Angle_node_form'
import ActiveNodes from '@/dashboard/components/pages-comps/Active_nodes'
import Header from '@/dashboard/components/shared-dash/Header'
import { getActiveNodes, getBuildings } from '@/services/apiRequests'
import { useQueries } from '@tanstack/react-query'

const CreateAngleNode = () => {
	const queryData = useQueries({
		queries: [
			{
				queryKey: ['get-active-nodes'],
				queryFn: getActiveNodes,
				retry: 1,
			},
			{
				queryKey: ['get-buildings'],
				queryFn: getBuildings,
				retry: 1,
			},
		],
	})

	// Ma'lumotlarni olish
	const activeNodes = queryData[0].data
	const activeBuildings = queryData[1].data
	const refetch = queryData[0].refetch

	return (
		<div className='w-full h-screen flex flex-col'>
			<Header />
			<div className='w-full h-full md:flex justify-center md:items-start mt-10 gap-3 p-3 pb-6 md:space-y-0 space-y-5'>
				<AngleNodeForm />
				<AngleBuildingForm
					refetch={refetch}
					buildings={activeBuildings}
					angle_nodes={activeNodes}
				/>
				<ActiveNodes nodes={activeNodes} />
			</div>
		</div>
	)
}

export default CreateAngleNode
