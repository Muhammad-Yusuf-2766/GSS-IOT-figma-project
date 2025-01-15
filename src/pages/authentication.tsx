import Login from '@/components/auth/login.form'
import Register from '@/components/auth/register.form'
import { Card } from '@/components/ui/card'
import { useAuthState } from '@/stores/auth.store'

const Authentication = () => {
	const { authState } = useAuthState()
	return (
		<div
			className='w-full h-screen flex items-center justify-center inset-0 relative z-10'
			style={{
				backgroundImage: "url('/src/assets/Footer-bg.jpg')",
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className='w-full h-full absolute top-0 left-0 -z-10 bg-black/40'></div>
			<Card className='p-8 md:w-1/3 w-auto relative bg-white/20 backdrop-blur-sm'>
				{authState === 'login' && <Login />}
				{authState === 'register' && <Register />}
			</Card>
		</div>
	)
}

export default Authentication
