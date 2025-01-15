import gssSafety from '@/assets/GSS_Safety.jpg'
import serviceSafety from '@/assets/service_safety.jpg'
import servicesFarm from '@/assets/services_farm.jpg'
import {
	IClient,
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
			'Lorem ipsum dolor sit amet consectetur adipisicing elit.Perferendis, corporis ullam? Corporis, possimus cupiditatevoluptatem voluptatibus deserunt est perspiciatis recusandaedistinctio corrupti assumenda accusantium aspernaturrepellendus cum expedita temporibus qui! Blanditiis reiciendisnatus quos dolores officiis ullam accusantium officia maximenemo fuga eveniet quidem ad, consectetur ducimus iste atqueconsequuntur, tempore perferendis velit! Id dolorem nihilquam! Tempore, quod amet.',
	},
	{
		id: 2,
		title: 'e-Smart Safety',
		subtitle: '',
		image: '/src/assets/service_safety.jpg',
		catalog: '',
		info: 'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit.Perferendis, corporis ullam? Corporis, possimus cupiditatevoluptatem voluptatibus deserunt est perspiciatis recusandaedistinctio corrupti assumenda accusantium aspernaturrepellendus cum expedita temporibus qui! Blanditiis reiciendisnatus quos dolores officiis ullam accusantium officia maximenemo fuga eveniet quidem ad, consectetur ducimus iste atqueconsequuntur, tempore perferendis velit! Id dolorem nihilquam! Tempore, quod amet.',
	},
	{
		id: 3,
		title: 'e-Smart Light',
		subtitle: '',
		image: '/src/assets/service_light.avif',
		catalog: '',
		info: 'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit.Perferendis, corporis ullam? Corporis, possimus cupiditatevoluptatem voluptatibus deserunt est perspiciatis recusandaedistinctio corrupti assumenda accusantium aspernaturrepellendus cum expedita temporibus qui! Blanditiis reiciendisnatus quos dolores officiis ullam accusantium officia maximenemo fuga eveniet quidem ad, consectetur ducimus iste atqueconsequuntur, tempore perferendis velit! Id dolorem nihilquam! Tempore, quod amet.',
	},

	{
		id: 4,
		title: 'e-Smart Farm',
		subtitle: '',
		image: '/src/assets/services_farm.jpg',
		catalog: '',
		info: 'IoT 기술이 적용된 악취제거 시스템을 스마트폰으로 쉽고 간편하게 제어하여 쾌적한 환경을 만들어줍니다.',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit.Perferendis, corporis ullam? Corporis, possimus cupiditatevoluptatem voluptatibus deserunt est perspiciatis recusandaedistinctio corrupti assumenda accusantium aspernaturrepellendus cum expedita temporibus qui! Blanditiis reiciendisnatus quos dolores officiis ullam accusantium officia maximenemo fuga eveniet quidem ad, consectetur ducimus iste atqueconsequuntur, tempore perferendis velit! Id dolorem nihilquam! Tempore, quod amet.',
	},
]

export const sidebarLinks: ISidebarLink[] = [
	{ path: '/admin/dashboard', name: '대시보드', icon: LucideBox },
	{ path: '/admin/dashboard/users', name: '사용자', icon: TbUsers },
	{ path: '/admin/dashboard/products', name: '제품', icon: AiOutlineProduct },
	{ path: '/admin/dashboard/clients', name: '임대 현황', icon: LuUser },
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

export const AllCLientsData: IClient[] = [
	{
		_id: '6759456a8bcb14617aa787c7',
		company: 'Hyundai',
		company_addr: '서울 이태원',
		buildings: [
			'67502110764c816861a2bac5',
			'675806338bcb14617aa7866e',
			'6750ef4f8bcb14617aa77ff2',
			'675024de8bcb14617aa77dd0',
		],
		boss_users: [
			'67502110764c816861a2bac5',
			'675806338bcb14617aa7866e',
			'6750ef4f8bcb14617aa77ff2',
			'675024de8bcb14617aa77dd0',
		],
		status: true,
	},
	{
		_id: '6759466b8bcc24628bb897d8',
		company: 'Samsung',
		company_addr: '서울 서초구',
		buildings: ['67502110764c816861a2bac5'],
		boss_users: [
			'67502140765d816872a2bcd1',
			'675806348bcc14628bb7868f',
			'6750ef5f8bcc24628bb78ff3',
			'675024df8bcc24628bb78de1',
		],
		status: false,
	},
	{
		_id: '6759477c9bcc34739cc998e9',
		company: 'LG',
		company_addr: '부산 해운대구',
		buildings: ['675806338bcb14617aa7866e'],
		boss_users: [
			'67502150766e816883a2cde2',
			'675806358bcc14628bb7870f',
			'6750ef6f8bcc34739cc79ff4',
			'675024df8bcc34739cc79de2',
		],
		status: true,
	},
	{
		_id: '6759488dabbc4484addaa9fa',
		company: 'Kia',
		company_addr: '대구 수성구',
		buildings: ['6750ef4f8bcb14617aa77ff2'],
		boss_users: [
			'67502160767f816894a2edf3',
			'675806368bcc14628bb7881f',
			'6750ef7f8bcc4484add89ff5',
			'675024df8bcc4484add89de3',
		],
		status: true,
	},
	{
		_id: '6759499e9bcc5495beeaaafb',
		company: 'SK',
		company_addr: '인천 미추홀구',
		buildings: ['675024de8bcb14617aa77dd0'],
		boss_users: [
			'675021707681816895a2fdf4',
			'675806378bcc14628bb7892f',
			'6750ef8f8bcc5495bee99ff6',
			'675024df8bcc5495bee99de4',
		],
		status: false,
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
	{ id: '3', icon: FaUserPlus, name: '사용자 생성', route: 'add-client' },
]
