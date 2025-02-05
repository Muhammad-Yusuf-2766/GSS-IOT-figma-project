import about_img from '@/assets/about_us.webp'
import { ChevronRight } from 'lucide-react'

const About = () => {
	return (
		<>
			<div className='w-full h-screen md:flex md:mb-0 mb-10 block items-center text-secondary'>
				{/* Left side */}
				<div className='md:w-[20%] md:h-full h-[15%] flex flex-col items-start bg-blue-950 gap-y-4 md:p-5 p-3'>
					<div className='w-1/2 h-[2px] bg-secondary my-5' />
					<h1 className='md:block hidden text-4xl leading-none font-montserrat tracking-widest'>
						A<br />B<br />O<br />U<br />T
					</h1>
					<h1 className='md:hidden  text-2xl leading-none font-montserrat tracking-widest'>
						ABOUT US
					</h1>
					<h1 className='md:block hidden text-4xl leading-none mt-4 font-montserrat tracking-widest'>
						U<br />S
					</h1>
				</div>

				{/* Right side */}
				<div
					className='w-full md:h-full h-[85%] flex flex-col items-center justify-center relative z-10'
					style={{
						backgroundImage: `url(${about_img})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<div className='w-full h-full bg-black/55 absolute top-0 left-0 -z-10' />
					<div className='w-full md:h-2/6 h-3/6 flex flex-col items-center justify-between'>
						<h1 className='md:text-3xl text-2xl text-center md:font-bold'>
							글로벌스마트솔루션은 사물인터넷 기술을 기반으로사회 및 <br />{' '}
							산업전반에 걸쳐 비대면 원격 무선 환경 제어 솔루션을 제공하는 IT
							기업입니다.
						</h1>
						<div className='w-1/2 h-[2px] bg-secondary mb-2' />
						<button className='w-fit md:p-4 p-3 flex items-center bg-black/70 rounded-full md:text-xl text-lg hover:shadow-md shadow-white group'>
							<span>Become a Member</span>
							<div>
								<ChevronRight className='group-hover:translate-x-1 transition-transform' />
							</div>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default About
