/* eslint-disable react/prop-types */
import { IUser } from '@/types/interfaces'
import { useState } from 'react'
interface IClientFormProps {
	users: IUser[]
}
const ClientForm = ({ users }: IClientFormProps) => {
	const [client, setClient] = useState({
		company: '',
		buildings: [],
		company_addr: '',
		boss_users: [],
	})
	const [buildings, setBuildings] = useState([])
	// State to manage the visibility of the dropdown
	const [userDropdownOpen, setUserDropdownOpen] = useState(false)
	const [buildigDropdownOpen, setBuildingDropdownOpen] = useState(false)
	const [selectedUsers, setSelectedUsers] = useState([])
	const [selectedBuildings, setSelectedBuildings] = useState([])

	return (
		<div className='md:w-[40%] flex justify-center items-center flex-col md:text-lg text-sm text-gray-500'>
			<h1 className='leading-none md:text-3xl text-xl font-bold text-gray-700 pb-2 mb-5 underline underline-offset-4'>
				사용자 추가
			</h1>
			<form className='w-full p-4 border bg-white rounded-lg shadow-lg shadow-gray-300'>
				{/* Client Company */}
				<div className='mb-4'>
					<label className='block font-medium mb-2'>현장대표:</label>
					<input
						required
						type='text'
						name='company'
						value={''}
						className='w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-700'
					/>
				</div>

				{/* Number of Buildings */}
				{/* <div className='mb-4'>
					<label className='block font-medium mb-2'>
						Number of Buildings:
					</label>
					<input
						required
						type='number'
						name='buildings'
						value={client.number_of_buildings}
						onChange={handleInputChange}
						className='w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-700'
					/>
				</div> */}

				{/* Buildings Addresses */}
				<div className='mb-4'>
					<label className='block font-medium mb-2'>기업주소:</label>
					<input
						required
						type='text'
						name='company_addr'
						value={''}
						className='w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-700'
					/>
				</div>

				{/* Buildings Selection Dropdown */}
				<div className='mb-4'>
					<h3>현장 선택:</h3>
					<div className='relative'>
						<button
							type='button'
							// onClick={toggleBuildingDropdown}
							className='w-full px-4 py-2 bg-blue-700 text-white rounded-md text-left flex justify-between items-center hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700'
						>
							현장 선택:
							<svg
								className={`w-5 h-5 transform transition-transform ${
									userDropdownOpen ? 'rotate-180' : ''
								}`}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M19 9l-7 7-7-7'
								/>
							</svg>
						</button>

						{buildigDropdownOpen && (
							<div className='mt-2 p-4 border border-gray-300 rounded-md bg-gray-200 absolute w-full z-10'>
								{buildings.length === 0 ? (
									<p className=''>사용불가 ( 건물 )</p>
								) : (
									buildings.map((building, index) => (
										<div key={index} className='flex items-center mb-2'>
											<input
												type='checkbox'
												// id={`user-${building._id}`}
												// checked={selectedBuildings.includes(building._id)}
												// onChange={() => handleBuildingCheckbox(building._id)}
												className='mr-2'
											/>
											<label
												// htmlFor={`user-${building._id}`}
												className=''
											>
												{/* {building.building_name}:{building.building_num} */}
											</label>
										</div>
									))
								)}
							</div>
						)}
					</div>
				</div>

				{/* User Selection Dropdown */}
				<div className='mb-4'>
					<h3>사용자 선택</h3>
					<div className='relative'>
						<button
							type='button'
							// onClick={toggleUserDropdown}
							className='w-full px-4 py-2 bg-blue-700 text-white rounded-md text-left flex justify-between items-center hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700'
						>
							사용자 선택
							<svg
								className={`w-5 h-5 transform transition-transform ${
									userDropdownOpen ? 'rotate-180' : ''
								}`}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M19 9l-7 7-7-7'
								/>
							</svg>
						</button>

						{userDropdownOpen && (
							<div className='mt-2 p-4 border border-gray-300 rounded-md bg-gray-200 absolute w-full z-10'>
								{users.length === 0 ? (
									<p className=''>사용불가 ( 사용자 )</p>
								) : (
									users.map((user, index) => (
										<div key={index} className='flex items-center mb-2'>
											<input
												type='checkbox'
												id={`user-${user._id}`}
												// checked={selectedUsers.includes(user._id)}
												// onChange={() => handleUserCheckbox(user._id)}
												className='mr-2'
											/>
											<label htmlFor={`user-${user._id}`} className=''>
												{user.user_name}
											</label>
										</div>
									))
								)}
							</div>
						)}
					</div>
				</div>

				{/* Submit Button */}
				<div className='flex justify-center mt-6'>
					<button
						type='submit'
						className='bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700'
					>
						제출
					</button>
				</div>
			</form>
		</div>
	)
}

export default ClientForm
