import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import SocketComponent from './test/testSocket'

// Lazy loading components
const MembersDetail = lazy(() => import('./components/pages.comp/memberDetail'))
const ServiceDetail = lazy(
	() => import('./components/pages.comp/serviceDetail')
)
const ActiveClientsPage = lazy(
	() => import('./dashboard/pages/admin/activeClientPage')
)
const AddClient = lazy(() => import('./dashboard/pages/admin/Add_client'))
const AddProduct = lazy(() => import('./dashboard/pages/admin/Add_product'))
const BuildingNodes = lazy(
	() => import('./dashboard/pages/admin/buildingNodes')
)
const Buildings = lazy(() => import('./dashboard/pages/admin/buildings'))
const Clients = lazy(() => import('./dashboard/pages/admin/clients'))
const GatewaysPage = lazy(() => import('./dashboard/pages/admin/Gateways'))
const MainPage = lazy(() => import('./dashboard/pages/admin/hero'))
// const NodesPage = lazy(() => import('./dashboard/pages/admin/Nodes'))
const Products = lazy(() => import('./dashboard/pages/admin/products'))
const UserTable = lazy(() => import('./dashboard/pages/admin/users'))
const Authentication = lazy(() => import('./pages/authentication'))
const Community = lazy(() => import('./pages/community'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const Home = lazy(() => import('./pages/Home'))
const MyPage = lazy(() => import('./pages/my-page'))
const Resource = lazy(() => import('./pages/resources'))
const Services = lazy(() => import('./pages/services'))

// Fallback Loader Component
const FallbackLoader = () => (
	<div className='flex justify-center items-center h-screen'>Loading...</div>
)

const App = () => {
	return (
		<div className='max-w-[100vw]'>
			<Suspense fallback={<FallbackLoader />}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/auth' element={<Authentication />} />
					<Route path='/resources' element={<Resource />} />
					<Route path='/services' element={<Services />} />
					<Route path='/services/:serviceId' element={<ServiceDetail />} />
					<Route path='/community' element={<Community />} />
					<Route path='/community/:memberId' element={<MembersDetail />} />
					<Route path='/my-page' element={<MyPage />} />

					{/* Dashboard routes */}
					<Route path='/admin/dashboard' element={<Dashboard />}>
						<Route path='' element={<MainPage />} />
						<Route path='active-clients' element={<ActiveClientsPage />} />
						<Route path='add-product' element={<AddProduct />} />
						<Route path='add-client' element={<AddClient />} />
						<Route path='users' element={<UserTable />} />
						<Route path='products' element={<Products />} />
						<Route path='product/gateways' element={<GatewaysPage />} />
						<Route path='product/nodes' element={<SocketComponent />} />
						<Route path='clients' element={<Clients />} />
						<Route path='clients/:clientId/buildings' element={<Buildings />} />
						<Route
							path='clients/:id/buildings/:buldingId'
							element={<BuildingNodes />}
						/>
					</Route>
				</Routes>
			</Suspense>
			<Toaster position='top-center' />
		</div>
	)
}

export default App
