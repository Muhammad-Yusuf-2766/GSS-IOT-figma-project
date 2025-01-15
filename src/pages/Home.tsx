import About from '@/components/home.comps/about'
import Footer from '@/components/home.comps/Footer'
import Hero from '@/components/home.comps/hero'
import CompanyMembers from '@/components/home.comps/members'
import HomeService from '@/components/home.comps/services'

const Home = () => {
	return (
		<div className='w-full h-full flex flex-col bg-background overflow-hidden'>
			<Hero />
			<About />
			<CompanyMembers />
			<HomeService />
			<Footer />
		</div>
	)
}

export default Home
