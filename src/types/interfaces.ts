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
	itemCount: number | undefined
	icon: React.ReactNode
}

export interface IHeadButton {
	id: string
	icon: IconType
	name: string
	route: string
}

export interface IBuildingFormProps {
	gateways: IGateway[]
	users: IUser[]
}

// ============== Data-Base related Data interfaces ========== //
export interface INode {
	_id: string
	doorNum: number
	doorChk: 0 | 1
	betChk: number
	product_status: boolean
	position: string
}

export interface IGateway {
	_id: string
	serial_number: string
	nodes: INode[]
	product_status: boolean
}

export interface IBuilding {
	_id: string
	building_name: string
	building_num: number
	building_addr: string
	gateway_sets: IGateway[]
	users: IUser[]
	permit_date: string
	expiration_date: string
	building_sts: boolean
}

export interface IClient {
	_id: string
	company: string
	company_addr: string
	buildings: IBuilding[]
	boss_users: IUser[]
	status: boolean
}

export type UserTitle = 'BOSS' | 'WORKER' | null
export type UserType = 'USER' | 'CLIENT' | 'ADMIN'

export interface IUser {
	_id: string
	user_name: string
	user_email: string
	user_phone: number
	user_password: string
	user_title?: UserTitle
	user_type?: UserType
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

export interface IUpdateUserType {
	user_id: string
	user_type: UserType
}

// ============== Data-Base related Data interfaces ========== //
