import { IconType } from 'react-icons/lib'

export interface ICarouselItem {
	backgroundImage: string
	title: string
	subtitle: string
	description: string
}

export interface IHomeService {
	serviceName: string
	img: string
	app: string
	catalog: string
}

export interface IResource {
	img: string
	title: string
}
export interface IResourceData {
	id: number
	name?: string
	title: string
	subtitle: string
	image: string
	catalog: string
	app?: string
	description: string
	info: string
}

export interface IService {
	id: number
	name: string
	title: string
	role: string
	video: string
	image: string
	catalog: string
	description: string
}

export interface IMember {
	id: number
	name: string
	role: string
	image: string
	position: {
		left: string
		top: string
	}
	description: string
}

export interface ISidebarLink {
	path: string
	name: string
	icon: React.ElementType
}

export interface ITotalCountBoxProps {
	itemName: string
	clients?: IClient[] | IBuilding[]
	icon: React.ReactNode
}

export interface IHeadButton {
	id: string
	icon: IconType
	name: string
	route: string
}

// ============== Data-Base related Data interfaces ========== //
export interface INode {
	_id: string
	doorNum: number
	doorChk: 0 | 1
	betChk: number
	node_status: boolean
	gateway_id: string
	position: string
}

export interface IAngleNode {
	_id: string
	doorNum: number
	angle_x: number
	angle_y: number
	node_status: boolean
	gateway_id: string
	position: string
}

export interface ICreateNode {
	doorNum: number
}

export interface IGateway {
	_id: string
	serial_number: string
	nodes: string[]
	building_id: string
	gateway_status: boolean
}

export interface ICreateGateway {
	serial_number: string
	nodes: string[]
}

export interface IBuilding {
	_id: string
	building_name: string
	building_num: number
	building_addr: string
	gateway_sets: string[]
	users: string[]
	permit_date: string
	expiry_date: string
	building_status: boolean
	nodes_position_file: string
}
export interface ICreateBuilding {
	building_name: string
	building_num: number
	building_addr: string
	gateway_sets: string[]
	users?: string[]
	permit_date: string
	expiry_date: string
}

export interface IClient {
	_id: string
	client_name: string
	client_addr: string
	client_buildings: IBuilding[]
	boss_users: IUser[]
	client_status: boolean
}

export interface IClientBuildings {
	state: string
	client_buildings: IBuilding[]
}

export interface ICreateClient {
	client_name: string
	client_addr: string
	client_buildings: string[]
	boss_users: string[]
}

export type UserTitle = 'BOSS' | 'WORKER' | null
export type UserType = 'USER' | 'CLIENT' | 'ADMIN'

export interface IUser {
	_id: string
	user_name: string
	user_email: string
	user_phone: number
	user_title: UserTitle
	user_type: UserType
}

export interface IRegisterUser {
	user_name: string
	user_email: string
	user_phone: number
	user_password: string
	user_title?: UserTitle
	user_type?: UserType
}
export interface ILogin {
	user_email: string
	user_password: string
}

export interface IResetPasswordStep1 {
	user_email: string
}
export interface IResetPasswordStep2 {
	user_email: string
	otp: number
	new_password?: string
}

export interface IUpdateUserType {
	user_id: string
	user_type: UserType
}

export interface IUpdateProductStatus {
	product_type: 'NODE' | 'GATEWAY'
	product_id: string
	product_endpoint: '/update-product' | '/delete-product'
}

export type AngleNodeCreate = {
	doorNum: number
}

// ============== Data-Base related Data interfaces ========== //
