import GssLogo from '@/assets/GSS-logo.svg'
import Login from '@/components/auth/login.form'
import Register from '@/components/auth/register.form'
import { Card } from '@/components/ui/card'
import { useAuthState } from '@/stores/auth.store'
import { Link } from 'react-router-dom'

const Authentication = () => {
	const { authState } = useAuthState()
	return (
		<div
			className='w-full h-screen flex flex-col py-10 md:px-16 relative z-10 text-secondary'
			style={{
				backgroundImage: "url('/src/assets/service_safety.jpg')",
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className='w-full h-full absolute top-0 left-0 -z-10 bg-black/45' />
			<div
				className='w-full h-full flex justify-around items-center border-[9px] border-white py-6 md:px-10 px-5'
				style={{ borderRadius: '40px' }}
			>
				<Link className='md:w-fit h-fit w-[70px] mt-10 hidden md:flex' to='/'>
					<img src={GssLogo} alt='Logo' className='md:w-[150px]' />
				</Link>
				{/* <div className='w-full h-full flex items-center justify-center'> */}
				<Card className='p-8 md:w-2/6 h-fit w-auto relative bg-gray-600/40 backdrop-blur-md	'>
					{authState === 'login' && <Login />}
					{authState === 'register' && <Register />}
				</Card>
				{/* </div> */}
			</div>
		</div>
	)
}

export default Authentication
