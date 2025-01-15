import { HiMiniSquares2X2 } from 'react-icons/hi2'
import { PiShareNetworkFill } from 'react-icons/pi'

export const NodesCard = () => {
	return (
		<div className='p-5 w-full h-[250px] flex justify-center items-center gap-x-10	 bg-white rounded-xl shadow-xl shadow-blue-200 border border-gray-300 cursor-pointer hover:shadow-blue-300 duration-200 text-gray-600 hover:text-blue-600'>
			<HiMiniSquares2X2 size={100} className=' font-bold' />

			<h1 className='text-2xl font-bold'>Nodes</h1>
		</div>
	)
}

export const GatewaysCard = () => {
	return (
		<div className='p-5 w-full h-[250px] flex justify-center items-center gap-x-10	 bg-white rounded-xl shadow-xl shadow-blue-200 border border-gray-300 cursor-pointer hover:shadow-blue-300 duration-200 text-gray-600  hover:text-blue-600'>
			<PiShareNetworkFill size={100} className=' font-bold' />

			<h1 className='text-2xl  font-bold'>Gate-ways</h1>
		</div>
	)
}
