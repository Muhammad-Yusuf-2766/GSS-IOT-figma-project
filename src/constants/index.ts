import gssSafety from '@/assets/GSS_Safety.jpg'
import serviceSafety from '@/assets/service_safety.jpg'
import servicesFarm from '@/assets/services_farm.jpg'
import {
	IHeadButton,
	IHomeService,
	IMember,
	IResourceData,
	ISidebarLink,
} from '@/types/interfaces'
import { LucideBox } from 'lucide-react'
import { AiOutlineProduct } from 'react-icons/ai'
import { FaClipboardList, FaUserPlus } from 'react-icons/fa'
import { HiSquaresPlus } from 'react-icons/hi2'
import { LuUser } from 'react-icons/lu'
import { TbUsers } from 'react-icons/tb'

export const navLinks = [
	{ label: 'GSS', path: '/' },
	{ label: '자료실', path: '/resources' },
	{ label: '서비스', path: '/services' },
	{ label: '커뮤니티', path: '/community' },
	{ label: '대시보드', path: '/admin/dashboard' },
]

export const members: IMember[] = [
	{
		id: 1,
		name: 'Kim Song Kang',
		role: 'Professor & Director',
		image: '/src/assets/Kim_prof.jpg',
		position: { left: '0', top: '0' },
		description:
			'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
	},
	{
		id: 2,
		name: 'Kim Jye Hyun',
		role: 'CEO manager',
		image: '/src/assets/Kim_mngr.jpg',
		position: { left: '250px', top: '50px' },
		description:
			'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
	},
	{
		id: 3,
		name: 'Yusuf',
		role: 'Web-Developer',
		image: '/src/assets/me_dev.jpg',
		position: { left: '500px', top: '100px' },
		description:
			'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
	},
	{
		id: 4,
		name: 'Yusuf',
		role: 'Web-Developer',
		image: '/src/assets/me_dev.jpg',
		position: { left: '500px', top: '100px' },
		description:
			'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
	},
	{
		id: 5,
		name: 'Kim Jye Hyun',
		role: 'CEO manager',
		image: '/src/assets/Kim_mngr.jpg',
		position: { left: '250px', top: '50px' },
		description:
			'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
	},
	{
		id: 6,
		name: 'Kim Song Kang',
		role: 'Professor & Director',
		image: '/src/assets/Kim_prof.jpg',
		position: { left: '0', top: '0' },
		description:
			'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
	},
]

export const serviceData: IHomeService[] = [
	{
		img: serviceSafety,
		serviceName: 'e-Smart Safety',
		app: '',
		catalog: '',
	},
	{
		img: servicesFarm,
		serviceName: 'e-Smart Farm',
		app: '',
		catalog: '',
	},
	{
		img: gssSafety,
		serviceName: 'GSS-건설현장 안전관리시스템',
		app: '',
		catalog: '',
	},
]

export const resourceServices: IResourceData[] = [
	{
		id: 1,
		name: 'Smart Guard',
		title: 'Gss-건설현장장',
		subtitle: '안전관리시스템',
		image: '/src/assets/GSS_Safety.jpg',
		catalog: '/path/to/catalog',
		app: '/path/to/application',
		info: 'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		description:
			'E Green Light는 사물과 사물 사이에 메시(Mesh)라는 무선망 그물 형태의 자체 RF 무선 통신 네트워크로 이루어져 있기 때문에 터널의 채굴과 터널 안전의 한 획을 긋고 나노 튜브시에 적외 통제가 없으며 메시의 불필요합니다. 이를 통해 된, 높장, 제도 공장시나 편식 등 어디에나 설치된 구동기들을 개별 및 그룹으로써 제어가 가능하고 각종 구동부터 큰 규모까지 커스터마이징 될 수 있습니다.',
	},
	{
		id: 2,
		title: 'e-Smart Safety',
		subtitle: '',
		image: '/src/assets/service_safety.jpg',
		catalog: '',
		info: 'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		description:
			'E Green Light는 사물과 사물 사이에 메시(Mesh)라는 무선망 그물 형태의 자체 RF 무선 통신 네트워크로 이루어져 있기 때문에 터널의 채굴과 터널 안전의 한 획을 긋고 나노 튜브시에 적외 통제가 없으며 메시의 불필요합니다. 이를 통해 된, 높장, 제도 공장시나 편식 등 어디에나 설치된 구동기들을 개별 및 그룹으로써 제어가 가능하고 각종 구동부터 큰 규모까지 커스터마이징 될 수 있습니다.',
	},
	{
		id: 3,
		title: 'e-Smart Light',
		subtitle: '',
		image: '/src/assets/service_light.avif',
		catalog: '',
		info: 'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		description:
			'E Green Light는 사물과 사물 사이에 메시(Mesh)라는 무선망 그물 형태의 자체 RF 무선 통신 네트워크로 이루어져 있기 때문에 터널의 채굴과 터널 안전의 한 획을 긋고 나노 튜브시에 적외 통제가 없으며 메시의 불필요합니다. 이를 통해 된, 높장, 제도 공장시나 편식 등 어디에나 설치된 구동기들을 개별 및 그룹으로써 제어가 가능하고 각종 구동부터 큰 규모까지 커스터마이징 될 수 있습니다.',
	},

	{
		id: 4,
		title: 'e-Smart Farm',
		subtitle: '',
		image: '/src/assets/services_farm.jpg',
		catalog: '',
		info: 'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		description:
			'E Green Light는 사물과 사물 사이에 메시(Mesh)라는 무선망 그물 형태의 자체 RF 무선 통신 네트워크로 이루어져 있기 때문에 터널의 채굴과 터널 안전의 한 획을 긋고 나노 튜브시에 적외 통제가 없으며 메시의 불필요합니다. 이를 통해 된, 높장, 제도 공장시나 편식 등 어디에나 설치된 구동기들을 개별 및 그룹으로써 제어가 가능하고 각종 구동부터 큰 규모까지 커스터마이징 될 수 있습니다.',
	},
]

export const sidebarLinks: ISidebarLink[] = [
	{ path: '/admin/dashboard', name: '대시보드', icon: LucideBox },
	{ path: '/admin/dashboard/users', name: '사용자', icon: TbUsers },
	{ path: '/admin/dashboard/products', name: '제품', icon: AiOutlineProduct },
	{ path: '/admin/dashboard/clients', name: '임대 현황', icon: LuUser },
]
export const headButtons: IHeadButton[] = [
	{
		id: '1',
		icon: FaClipboardList,
		name: '현황 리스트',
		route: 'active-clients',
	},
	{ id: '2', icon: HiSquaresPlus, name: '제품 등록', route: 'add-product' },
	{ id: '3', icon: FaUserPlus, name: '사용자 생성', route: 'add-client' },
]

// =========== Temporary Testing datas =========== //
// export const Users: IUser[] = [
// 	{
// 		_id: 'asfdghfgfsa',
// 		user_name: 'Mansur',
// 		user_email: 'asfdnj@gmail.com',
// 		user_phone: 123456432,
// 		user_title: 'BOSS',
// 		user_type: 'CLIENT',
// 	},
// 	{
// 		_id: 'asfdghfgfsa',
// 		user_name: 'Mansur',
// 		user_email: 'asfdnj@gmail.com',
// 		user_phone: 123456432,
// 		user_title: 'BOSS',
// 		user_type: 'CLIENT',
// 	},
// 	{
// 		_id: 'asfdghfgfsa',
// 		user_name: 'Mansur',
// 		user_email: 'asfdnj@gmail.com',
// 		user_phone: 123456432,
// 		user_title: 'BOSS',
// 		user_type: 'CLIENT',
// 	},
// 	{
// 		_id: 'asfdghfgfsa',
// 		user_name: 'Mansur',
// 		user_email: 'asfdnj@gmail.com',
// 		user_phone: 123456432,
// 		user_title: 'BOSS',
// 		user_type: 'CLIENT',
// 	},
// ]

// export const Nodes: INode[] = [
// 	{
// 		_id: '234kmnj',
// 		betChk: 39,
// 		doorChk: 1,
// 		doorNum: 1,
// 		position: '',
// 		product_status: false,
// 	},
// 	{
// 		_id: '234kmnjGhn',
// 		betChk: 39,
// 		doorChk: 1,
// 		doorNum: 2,
// 		position: '',
// 		product_status: false,
// 	},
// 	{
// 		_id: 'sfdghjmf234kmnj',
// 		betChk: 39,
// 		doorChk: 0,
// 		doorNum: 1,
// 		position: '',
// 		product_status: false,
// 	},
// 	{
// 		_id: 'sfdg234kmnjAFGhn',
// 		betChk: 39,
// 		doorChk: 1,
// 		doorNum: 3,
// 		position: '',
// 		product_status: false,
// 	},
// 	{
// 		_id: 'sf234kmnjdsAFGhn',
// 		betChk: 39,
// 		doorChk: 0,
// 		doorNum: 4,
// 		position: '',
// 		product_status: false,
// 	},
// 	{
// 		_id: 'sfdghjmfg234kmnjFGhn',
// 		betChk: 39,
// 		doorChk: 0,
// 		doorNum: 5,
// 		position: '',
// 		product_status: false,
// 	},
// 	{
// 		_id: 'sf234kmnjfgdsAFGhn',
// 		betChk: 39,
// 		doorChk: 0,
// 		doorNum: 6,
// 		position: '',
// 		product_status: false,
// 	},
// 	{
// 		_id: 's234kmnjn',
// 		betChk: 39,
// 		doorChk: 0,
// 		doorNum: 7,
// 		position: '',
// 		product_status: false,
// 	},
// 	{
// 		_id: 'sfd234kmnjn',
// 		betChk: 39,
// 		doorChk: 1,
// 		doorNum: 8,
// 		position: '',
// 		product_status: false,
// 	},
// 	{
// 		_id: 's234kmnjhjmfgdsAFGhn',
// 		betChk: 39,
// 		doorChk: 0,
// 		doorNum: 9,
// 		position: '',
// 		product_status: false,
// 	},
// 	{
// 		_id: 'sfdghjmfgds234kmnjFGhn',
// 		betChk: 39,
// 		doorChk: 0,
// 		doorNum: 10,
// 		position: '',
// 		product_status: false,
// 	},
// ]

// export const Gateways: IGateway[] = [
// 	{
// 		_id: 'sadfg',
// 		nodes: Nodes,
// 		product_status: false,
// 		serial_number: '0001',
// 	},
// 	{
// 		_id: 'sgsfda',
// 		nodes: Nodes,
// 		product_status: false,
// 		serial_number: '0002',
// 	},
// 	{
// 		_id: 'sadda',
// 		nodes: Nodes,
// 		product_status: false,
// 		serial_number: '0003',
// 	},
// 	{
// 		_id: 'sadfgsf',
// 		nodes: Nodes,
// 		product_status: false,
// 		serial_number: '0004',
// 	},
// 	{
// 		_id: 'gsfda',
// 		nodes: Nodes,
// 		product_status: false,
// 		serial_number: '0005',
// 	},
// 	{
// 		_id: 'sad',
// 		nodes: Nodes,
// 		product_status: false,
// 		serial_number: '0006',
// 	},
// 	{
// 		_id: 'sa234kmnjsfda',
// 		nodes: Nodes,
// 		product_status: false,
// 		serial_number: '0007',
// 	},
// ]

// export const Buildings: IBuilding[] = [
// 	{
// 		_id: 'asdfgbdh',
// 		building_num: 1,
// 		building_name: 'Samsung',
// 		building_addr: 'Seoul goyang',
// 		building_sts: true,
// 		gateway_sets: Gateways,
// 		users: Users,
// 		permit_date: '2024-09-24',
// 		expiration_date: '2026-09-24',
// 	},
// 	{
// 		_id: 'asdfgbdh',
// 		building_num: 1,
// 		building_name: 'Samsung',
// 		building_addr: 'Seoul goyang',
// 		building_sts: true,
// 		gateway_sets: Gateways,
// 		users: Users,
// 		permit_date: '2024-09-24',
// 		expiration_date: '2026-09-24',
// 	},
// 	{
// 		_id: 'asdfgbdh',
// 		building_num: 1,
// 		building_name: 'Samsung',
// 		building_addr: 'Seoul goyang',
// 		building_sts: true,
// 		gateway_sets: Gateways,
// 		users: Users,
// 		permit_date: '2024-09-24',
// 		expiration_date: '2026-09-24',
// 	},
// 	{
// 		_id: 'asdfgbdh',
// 		building_num: 1,
// 		building_name: 'Samsung',
// 		building_addr: 'Seoul goyang',
// 		building_sts: true,
// 		gateway_sets: Gateways,
// 		users: Users,
// 		permit_date: '2024-09-24',
// 		expiration_date: '2026-09-24',
// 	},
// 	{
// 		_id: 'asdfgbdh',
// 		building_num: 1,
// 		building_name: 'Samsung',
// 		building_addr: 'Seoul goyang',
// 		building_sts: true,
// 		gateway_sets: Gateways,
// 		users: Users,
// 		permit_date: '2024-09-24',
// 		expiration_date: '2026-09-24',
// 	},
// ]

export const ActiveClients = [
	{
		client_company: 'Tech Innovators',
		number_of_buildings: 5,
		client_users: {
			user1_boss: 'John Doe',
			user2_assistant: 'Jane Smith',
		},
		permit_date: '2023-01-15',
		expiry_date: '2025-01-14',
	},
	{
		client_company: 'Green Energy Co.',
		number_of_buildings: 3,
		client_users: {
			user1_boss: 'Alice Green',
			user2_assistant: 'Bob Brown',
		},
		permit_date: '2022-06-10',
		expiry_date: '2024-06-09',
	},
	{
		client_company: 'Urban Developers',
		number_of_buildings: 8,
		client_users: {
			user1_boss: 'Charlie Black',
			user2_assistant: 'Dana White',
		},
		permit_date: '2023-03-01',
		expiry_date: '2025-02-28',
	},
	{
		client_company: 'Tech Innovators',
		number_of_buildings: 5,
		client_users: {
			user1_boss: 'John Doe',
			user2_assistant: 'Jane Smith',
		},
		permit_date: '2023-01-15',
		expiry_date: '2025-01-14',
	},
	{
		client_company: 'Green Energy Co.',
		number_of_buildings: 3,
		client_users: {
			user1_boss: 'Alice Green',
			user2_assistant: 'Bob Brown',
		},
		permit_date: '2022-06-10',
		expiry_date: '2024-06-09',
	},
	{
		client_company: 'Urban Developers',
		number_of_buildings: 8,
		client_users: {
			user1_boss: 'Charlie Black',
			user2_assistant: 'Dana White',
		},
		permit_date: '2023-03-01',
		expiry_date: '2025-02-28',
	},
	{
		client_company: 'Tech Innovators',
		number_of_buildings: 5,
		client_users: {
			user1_boss: 'John Doe',
			user2_assistant: 'Jane Smith',
		},
		permit_date: '2023-01-15',
		expiry_date: '2025-01-14',
	},
	{
		client_company: 'Green Energy Co.',
		number_of_buildings: 3,
		client_users: {
			user1_boss: 'Alice Green',
			user2_assistant: 'Bob Brown',
		},
		permit_date: '2022-06-10',
		expiry_date: '2024-06-09',
	},
	{
		client_company: 'Urban Developers',
		number_of_buildings: 8,
		client_users: {
			user1_boss: 'Charlie Black',
			user2_assistant: 'Dana White',
		},
		permit_date: '2023-03-01',
		expiry_date: '2025-02-28',
	},
	{
		client_company: 'Tech Innovators',
		number_of_buildings: 5,
		client_users: {
			user1_boss: 'John Doe',
			user2_assistant: 'Jane Smith',
		},
		permit_date: '2023-01-15',
		expiry_date: '2025-01-14',
	},
	{
		client_company: 'Green Energy Co.',
		number_of_buildings: 3,
		client_users: {
			user1_boss: 'Alice Green',
			user2_assistant: 'Bob Brown',
		},
		permit_date: '2022-06-10',
		expiry_date: '2024-06-09',
	},
	{
		client_company: 'Urban Developers',
		number_of_buildings: 8,
		client_users: {
			user1_boss: 'Charlie Black',
			user2_assistant: 'Dana White',
		},
		permit_date: '2023-03-01',
		expiry_date: '2025-02-28',
	},
]

// export const AllCLientsData: IClient[] = [
// 	{
// 		_id: '6759456a8bcb14617aa787c7',
// 		company: 'Hyundai',
// 		company_addr: '서울 이태원',
// 		buildings: Buildings,
// 		boss_users: Users,
// 		status: true,
// 	},
// 	{
// 		_id: '6759466b8bcc24628bb897d8',
// 		company: 'Samsung',
// 		company_addr: '서울 서초구',
// 		buildings: Buildings,
// 		boss_users: Users,
// 		status: false,
// 	},
// 	{
// 		_id: '6759477c9bcc34739cc998e9',
// 		company: 'LG',
// 		company_addr: '부산 해운대구',
// 		buildings: Buildings,
// 		boss_users: Users,
// 		status: true,
// 	},
// 	{
// 		_id: '6759488dabbc4484addaa9fa',
// 		company: 'Kia',
// 		company_addr: '대구 수성구',
// 		buildings: Buildings,
// 		boss_users: Users,
// 		status: true,
// 	},
// 	{
// 		_id: '6759499e9bcc5495beeaaafb',
// 		company: 'SK',
// 		company_addr: '인천 미추홀구',
// 		buildings: Buildings,
// 		boss_users: Users,
// 		status: false,
// 	},
// ]

// =========== Temporary Testing datas =========== //
