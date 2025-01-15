import BuildingForm from '@/components/forms/Building_form'
import ClientForm from '@/components/forms/Client_form'
import Header from '@/dashboard/components/shared-dash/Header'
import { IGateway, IUser } from '@/types/interfaces'
import { useState } from 'react'

const AddClient = () => {
	const [gateways, setGateways] = useState<IGateway[]>([])
	const [users, setUsers] = useState<IUser[]>([])

	return (
		<div className='w-full h-full flex flex-col justify-between'>
			<Header />
			<div className='w-full h-full md:flex justify-center md:items-start mt-10 gap-3 p-3 pb-6 md:space-y-0 space-y-5'>
				<BuildingForm gateways={gateways} users={users} />
				<ClientForm users={users} />
			</div>
		</div>
	)
}

export default AddClient
