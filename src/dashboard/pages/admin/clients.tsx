import { AllCLientsData } from '@/constants'
import ClientCard from '@/dashboard/components/shared-dash/ClientCard'
import Header from '@/dashboard/components/shared-dash/Header'
import TotalCountBox from '@/dashboard/components/shared-dash/TotalCount'
import { ITotalCountBoxProps } from '@/types/interfaces'
import { LuUser } from 'react-icons/lu'
import { Link } from 'react-router-dom'
// import ClientCard from '../components/client-comps/ClientCard'
// import Header from '../components/shared-dash/Header'
// import TotalCountBox from '../components/shared-dash/TotalCount'

const Clients = () => {
	const totalCountData: ITotalCountBoxProps = {
		itemName: '임대 현황',
		itemCount: 5,
		icon: <LuUser />,
	}

	return (
		<div className='w-full h-full'>
			<Header />
			<div className='md:w-fit w-full mx-auto my-4'>
				<TotalCountBox data={totalCountData} />
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
				{AllCLientsData && AllCLientsData.length > 0 ? (
					AllCLientsData.map(client => (
						<Link to={`/admin/dashboard/client/${client._id}`}>
							<ClientCard client={client} />
						</Link>
					))
				) : (
					<div className='col-span-3 text-center text-gray-700 py-10'>
						<h1 className='text-xl font-bold mx-auto text-red-500'>
							There is no any Clients data :(
						</h1>
					</div>
				)}
			</div>
		</div>
	)
}

export default Clients
