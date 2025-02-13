import ActiveClientsList from '@/dashboard/components/shared-dash/activeClients'
import Header from '../../components/shared-dash/Header'

const ActiveClientsPage = () => {
	return (
		<div className='w-full h-full'>
			<Header />
			<ActiveClientsList />
		</div>
	)
}

export default ActiveClientsPage
