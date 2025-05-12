import gssSafety from '@/assets/GSS_Safety.jpg'
import Kim_manager from '@/assets/Kim_mngr.jpg'
import Kim_prof_img from '@/assets/Kim_prof.jpg'
import Yusuf_dev from '@/assets/me_dev.jpg'
import servicesLight from '@/assets/service_light.avif'
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
import { BsBuildingsFill } from 'react-icons/bs'
import { FaClipboardList, FaUserPlus } from 'react-icons/fa'
import { HiSquaresPlus } from 'react-icons/hi2'
import { LuUser } from 'react-icons/lu'
import { MdGraphicEq } from 'react-icons/md'
import { TbUsers } from 'react-icons/tb'

export const navLinks = [
	{ label: 'GSS', path: '/' },
	{ label: '자료실', path: '/resources' },
	{ label: '서비스', path: '/services' },
	{ label: '커뮤니티', path: '/community' },
]

export const members: IMember[] = [
	{
		id: 1,
		name: 'Kim Song Kang',
		role: 'Professor & Director',
		image: Kim_prof_img,
		position: { left: '0', top: '0' },
		description:
			'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
	},
	{
		id: 2,
		name: 'Kim Jye Hyun',
		role: 'CEO manager',
		image: Kim_manager,
		position: { left: '250px', top: '50px' },
		description:
			'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
	},
	{
		id: 3,
		name: 'Yusuf',
		role: 'Web-Developer',
		image: Yusuf_dev,
		position: { left: '500px', top: '100px' },
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
		image: gssSafety,
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
		image: serviceSafety,
		catalog: '',
		info: 'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		description:
			'E Green Light는 사물과 사물 사이에 메시(Mesh)라는 무선망 그물 형태의 자체 RF 무선 통신 네트워크로 이루어져 있기 때문에 터널의 채굴과 터널 안전의 한 획을 긋고 나노 튜브시에 적외 통제가 없으며 메시의 불필요합니다. 이를 통해 된, 높장, 제도 공장시나 편식 등 어디에나 설치된 구동기들을 개별 및 그룹으로써 제어가 가능하고 각종 구동부터 큰 규모까지 커스터마이징 될 수 있습니다.',
	},
	{
		id: 3,
		title: 'e-Smart Light',
		subtitle: '',
		image: servicesLight,
		catalog: '',
		info: 'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		description:
			'E Green Light는 사물과 사물 사이에 메시(Mesh)라는 무선망 그물 형태의 자체 RF 무선 통신 네트워크로 이루어져 있기 때문에 터널의 채굴과 터널 안전의 한 획을 긋고 나노 튜브시에 적외 통제가 없으며 메시의 불필요합니다. 이를 통해 된, 높장, 제도 공장시나 편식 등 어디에나 설치된 구동기들을 개별 및 그룹으로써 제어가 가능하고 각종 구동부터 큰 규모까지 커스터마이징 될 수 있습니다.',
	},

	{
		id: 4,
		title: 'e-Smart Farm',
		subtitle: '',
		image: servicesFarm,
		catalog: '',
		info: 'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		description:
			'E Green Light는 사물과 사물 사이에 메시(Mesh)라는 무선망 그물 형태의 자체 RF 무선 통신 네트워크로 이루어져 있기 때문에 터널의 채굴과 터널 안전의 한 획을 긋고 나노 튜브시에 적외 통제가 없으며 메시의 불필요합니다. 이를 통해 된, 높장, 제도 공장시나 편식 등 어디에나 설치된 구동기들을 개별 및 그룹으로써 제어가 가능하고 각종 구동부터 큰 규모까지 커스터마이징 될 수 있습니다.',
	},
]

export const sidebarAdminLinks: ISidebarLink[] = [
	{ path: '/admin/dashboard', name: '대시보드', icon: LucideBox },
	{ path: '/admin/dashboard/users', name: '사용자', icon: TbUsers },
	{ path: '/admin/dashboard/products', name: '제품', icon: AiOutlineProduct },
	{ path: '/admin/dashboard/clients', name: '임대 현황', icon: LuUser },
]

export const sidebarClientLinks: ISidebarLink[] = [
	{ path: '/client/dashboard', name: '대시보드', icon: LucideBox },
	{
		path: '/client/dashboard/clients',
		name: '총 임대현황',
		icon: BsBuildingsFill,
	},
]

export const headButtons: IHeadButton[] = [
	{
		id: '1',
		icon: FaClipboardList,
		name: '현황 리스트',
		route: 'active-clients',
	},
	{ id: '2', icon: HiSquaresPlus, name: '제품 등록', route: 'add-product' },
	{
		id: '3',
		icon: FaUserPlus,
		name: '비계전도 노드 생선',
		route: 'add-client',
	},
	{
		id: '4',
		icon: MdGraphicEq,
		name: '사용자 생선',
		route: 'create-angle-node',
	},
]

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
