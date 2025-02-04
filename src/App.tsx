import { Route, Routes } from 'react-router-dom'
import { MembersDetail } from './components/pages.comp/memberDetail'
import ServiceDetail from './components/pages.comp/serviceDetail'
import { Toaster } from './components/ui/sonner'
import ActiveClientsPage from './dashboard/pages/admin/activeClientPage'
import AddClient from './dashboard/pages/admin/Add_client'
import AddProduct from './dashboard/pages/admin/Add_product'
import BuildingNodes from './dashboard/pages/admin/buildingNodes'
import Buildings from './dashboard/pages/admin/buildings'
import Clients from './dashboard/pages/admin/clients'
import GatewaysPage from './dashboard/pages/admin/Gateways'
import MainPage from './dashboard/pages/admin/hero'
import NodesPage from './dashboard/pages/admin/Nodes'
import Products from './dashboard/pages/admin/products'
import UserTable from './dashboard/pages/admin/users'
import Authentication from './pages/authentication'
import Community from './pages/community'
import Dashboard from './pages/dashboard'
import Home from './pages/Home'
import Resource from './pages/resources'
import Services from './pages/services'

const App = () => {
	return (
		<div className='max-w-[100vw]'>
			<Routes>
				<Route path='/'>
					<Route path='' element={<Home />} />
					<Route path='/auth' element={<Authentication />} />
					<Route path='/resources' element={<Resource />} />
					<Route path='/services' element={<Services />} />
					<Route path='/services/:serviceId' element={<ServiceDetail />} />
					<Route path='/community' element={<Community />} />
					<Route path='/community/:memberId' element={<MembersDetail />} />
				</Route>

				{/* Dashboard routes */}
				<Route path='/admin/dashboard' element={<Dashboard />}>
					<Route path='' element={<MainPage />} />
					<Route path='active-clients' element={<ActiveClientsPage />} />
					<Route path='add-product' element={<AddProduct />} />
					<Route path='add-client' element={<AddClient />} />
					<Route path='users' element={<UserTable />} />
					<Route path='products' element={<Products />} />
					<Route path='product/gateways' element={<GatewaysPage />} />
					<Route path='product/nodes' element={<NodesPage />} />
					<Route path='clients' element={<Clients />} />
					<Route path='clients/:clientId/buildings' element={<Buildings />} />
					<Route
						path='clients/:id/buildings/:buldingId'
						element={<BuildingNodes />}
					/>
				</Route>
			</Routes>
			<Toaster position='top-center' />
		</div>
	)
}

export default App
