import logo from '@/assets/GSS-logo.svg'

const Footer = () => {
	return (
		<div className='w-full h-full md:flex items-center justify-between bg-blue-950 md:p-6 p-3 text-secondary'>
			<div className=''>
				<img src={logo} alt='logo' className='w-fit h-fit' />
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
	)
}

export default Footer
