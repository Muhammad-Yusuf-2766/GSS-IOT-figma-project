const Footer = () => {
	return (
		<div className='w-full h-full text-secondary'>
			<div
				className='w-full h-screen flex justify-center items-center relative z-10'
				style={{
					backgroundImage: `url('/src/assets/Footer-bg.jpg')`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='absolute w-full h-full bg-black/45 top-0 left-0 -z-10' />
				<div className='md:w-7/12 md:h-2/5 h-1/3 flex flex-col justify-between items-center mx-5'>
					<h1 className='text-[30px] font-oswald font-bold tracking-wide text-center'>
						GSS 기업과 함게 스마트한 일상을 경험해보세요!
					</h1>
					<div className='w-full flex items-center justify-between gap-x-3'>
						<button className='md:w-[330px] w-full md:text-xl font-bold text-black/70 p-2 rounded-full bg-gray-300/50 hover:bg-gray-300/65'>
							로기인인 <br />
							<span className='text-sm font-thin md:block hidden'>
								로그인 하고 더 많은 서비스를 형험해보세요
							</span>
						</button>
						<button className='md:w-[330px] w-full md:text-xl font-bold text-black/70 p-2 rounded-full bg-gray-300/50 hover:bg-gray-300/65'>
							회원가입 <br />
							<span className='text-sm font-thin md:block hidden'>
								GSS의 회원 되러 바로 가기
							</span>
						</button>
					</div>
				</div>
			</div>
			{/* Footer Information */}
			<div className='w-full h-full md:flex items-center justify-between bg-blue-950 md:p-6 p-3'>
				<div className=''>
					<img
						src='/src/assets/GSS-logo.svg'
						alt='logo'
						className='w-fit h-fit'
					/>
				</div>

				<div className='md:mt-0 mt-5 border-b md:border-b-0'>
					<ul className='space-y-2'>
						<li>법인명(상호) : 글로벌스마트솔루션 주식회사</li>
						<li>대표자 : 박옥경</li>
						<li>사업자 등록번호 안내 : 894-88-00403</li>
						<li>통신판매업 신고 : 제 2020 - 고양덕양구 - 1484호</li>
					</ul>
				</div>

				<div className='md:mt-0 mt-5 border-b md:border-b-0'>
					<ul className='space-y-2'>
						<li>김재현 (gssiot@naver.com)</li>
						<li>010-5945-0242</li>
						<li>02-6404-2370</li>
						<li>
							경기도 고양시 덕양구 삼막3길 5, (618호) (고양삼송한강듀클래스)
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Footer
