import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import FillLoading from './components/shared/fill-laoding'
import UnauthorizedPage from './components/shared/unauthorizedPage'
import { Toaster } from './components/ui/sonner'
import ProtectedRoute from './dashboard/components/const/protectedRoutes'
import ClientBuildingNodes from './dashboard/pages/user/buildingNodes'
import ClientTypeBuildings from './dashboard/pages/user/buildings'
import ClientBossClientsPage from './dashboard/pages/user/clients'
import ClientMainPage from './dashboard/pages/user/hero'
import { AdminDashboard, ClientDashboard } from './pages/dashboard'
// import OrientationDisplay from './test/orientation'
import { ChartByDateFilters } from './dashboard/pages/user/lineChart'

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
const NodesPage = lazy(() => import('./dashboard/pages/admin/Nodes'))
const Products = lazy(() => import('./dashboard/pages/admin/products'))
const UserTable = lazy(() => import('./dashboard/pages/admin/users'))
const Authentication = lazy(() => import('./pages/authentication'))
const Community = lazy(() => import('./pages/community'))
const Home = lazy(() => import('./pages/Home'))
const MyPage = lazy(() => import('./pages/my-page'))
const Resource = lazy(() => import('./pages/resources'))
const Services = lazy(() => import('./pages/services'))

// Fallback Loader Component
const FallbackLoader = () => (
	<>
		<FillLoading />
	</>
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
					<Route path='/unauthorized' element={<UnauthorizedPage />} />

					{/* Dashboard routes */}
					<Route
						path='/admin/dashboard'
						element={
							<ProtectedRoute allowedRoles={['ADMIN']}>
								<AdminDashboard />
							</ProtectedRoute>
						}
					>
						{/* <Route path='orientation' element={<OrientationDisplay />} /> */}
						<Route path='' element={<MainPage />} />
						<Route path='active-clients' element={<ActiveClientsPage />} />
						<Route path='add-product' element={<AddProduct />} />
						<Route path='add-client' element={<AddClient />} />
						<Route path='statistics' element={<ChartByDateFilters />} />
						<Route path='users' element={<UserTable />} />
						<Route path='products' element={<Products />} />
						<Route path='product/gateways' element={<GatewaysPage />} />
						<Route path='product/nodes' element={<NodesPage />} />
						<Route path='clients' element={<Clients />} />
						<Route path='clients/:clientId/buildings' element={<Buildings />} />
						<Route
							path='clients/:id/buildings/:buildingId'
							element={<BuildingNodes />}
						/>
					</Route>

					{/* Client Dashboard routes */}
					<Route
						path='/client/dashboard'
						element={
							<ProtectedRoute allowedRoles={['CLIENT']}>
								<ClientDashboard />
							</ProtectedRoute>
						}
					>
						<Route path='' element={<ClientMainPage />} />
						<Route path='clients' element={<ClientBossClientsPage />} />
						<Route
							path='clients/:clientId/buildings'
							element={<ClientTypeBuildings />}
						/>
						<Route
							path='clients/:id/buildings/:buildingId'
							element={<ClientBuildingNodes />}
						/>
					</Route>
				</Routes>
			</Suspense>
			<Toaster position='top-center' />
		</div>
	)
}

export default App
