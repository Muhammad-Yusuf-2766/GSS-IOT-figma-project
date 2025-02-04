/* eslint-disable @typescript-eslint/no-explicit-any */
// api.ts
import {
	IBuilding,
	IClient,
	ICreateBuilding,
	ICreateClient,
	ICreateGateway,
	ICreateNode,
	ILogin,
	IRegisterUser,
	IResetPasswordStep1,
	IResetPasswordStep2,
	IUpdateUserType,
} from '@/types/interfaces'
import axios from 'axios'

//  ============= USER related requests ============ //
export const registerRequest = async (signupData: IRegisterUser) => {
	try {
		const res = await axios.post(
			`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
			signupData,
			{
				withCredentials: true,
			}
		)
		const data = res.data

		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on login: Undefined error')
		}

		return data
	} catch (err: any) {
		console.error(`ERROR ::: registerRequest ${err.message}`)
		throw err
	}
}

export const loginRequest = async (user: ILogin) => {
	try {
		const res = await axios.post(
			`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
			user,
			{
				withCredentials: true,
			}
		)

		const data = res.data

		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on login')
		}

		return data
	} catch (error: any) {
		// Axios error qayta ishlash
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message || 'Error on login')
		}
		// Boshqa xatolik
		throw new Error(error.message || 'Error on login: Undefined error.')
	}
}

export const logoutRequest = async () => {
	try {
		const res = await axios.get(
			`${import.meta.env.VITE_SERVER_BASE_URL}/auth/logout`,
			{ withCredentials: true }
		)
		const data = res.data
		if (data.state === 'fail') {
			throw new Error(data.message)
		}
		return true
	} catch (error: any) {
		throw new Error(error.message || 'Error on logout: undefined error')
	}
}

export const resetPasswordRequest = async (user_email: IResetPasswordStep1) => {
	try {
		const res = await axios.post(
			`${import.meta.env.VITE_SERVER_BASE_URL}/auth/reset-password`,
			user_email,
			{
				withCredentials: true,
			}
		)

		const data = res.data

		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on reset-password')
		}

		return data
	} catch (error: any) {
		// Axios error qayta ishlash
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message || 'Error on reset-password')
		}
		// Boshqa xatolik
		throw new Error(
			error.message || 'Error on reset-password: Undefined error.'
		)
	}
}

export const resetPasswordVerifyRequest = async (
	resetData: IResetPasswordStep2
) => {
	try {
		const res = await axios.post(
			`${import.meta.env.VITE_SERVER_BASE_URL}/auth/password-verify`,
			resetData,
			{
				withCredentials: true,
			}
		)

		const data = res.data

		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on reset-password')
		}

		return data
	} catch (error: any) {
		// Axios error qayta ishlash
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message || 'Error on reset-password')
		}
		// Boshqa xatolik
		throw new Error(
			error.message || 'Error on reset-password: Undefined error.'
		)
	}
}

//  Hali ishlatilmadi auth prodiver da.
// export const checkUser = async () => {
// 	try {
// 		const response = await axios.get(`$/auth/user`, {
// 			withCredentials: true,
// 		})
// 		const user = response.data
// 		return user
// 	} catch (error: any) {
// 		throw new Error(
// 			error.response?.data?.message || 'Error on connecting to server.'
// 		)
// 	}
// }

export const getUsers = async () => {
	try {
		const res = await axios.get(
			`${import.meta.env.VITE_SERVER_BASE_URL}/auth/get-users`,
			{ withCredentials: true }
		)

		const data = res.data
		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on login: Undefined error')
		}
		return data.users
	} catch (error: any) {
		throw new Error(error.message || 'Error on connecting to server.')
	}
}

export const updateUserTypes = async (updateData: IUpdateUserType) => {
	try {
		const res = await axios.post(
			`${import.meta.env.VITE_SERVER_BASE_URL}/auth/update-user-types`,
			updateData,
			{ withCredentials: true }
		)

		const data = res.data
		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on updating-user: Undefined error')
		}
		return data
	} catch (error: any) {
		throw new Error(error.message || 'Error on connecting to server.')
	}
}

export const deleteUser = async (user_id: string) => {
	try {
		const res = await axios.post(
			`${import.meta.env.VITE_SERVER_BASE_URL}/auth/delete-user`,
			{ user_id },
			{ withCredentials: true }
		)

		const data = res.data
		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on deleting-user: Undefined error')
		}
		return data
	} catch (error: any) {
		throw new Error(error.message || 'Error on connecting to server.')
	}
}

//  ============= PRODUCT related requests ============ //

export const getGateways = async () => {
	try {
		const res = await axios.get(
			`${import.meta.env.VITE_SERVER_BASE_URL}/product/get-gateways`,
			{ withCredentials: true }
		)

		const data = res.data
		if (data.state === 'fail') {
			throw new Error(
				data.message || 'Error on getting-gateways: Undefined error'
			)
		}
		return data
	} catch (error: any) {
		throw new Error(error.message || 'Error on connecting to server.')
	}
}
export const getActiveGateways = async () => {
	try {
		const res = await axios.get(
			`${import.meta.env.VITE_SERVER_BASE_URL}/product/get-active-gateways`,
			{ withCredentials: true }
		)

		const data = res.data
		if (data.state === 'fail') {
			throw new Error(
				data.message || 'Error on getting-gateways: Undefined error'
			)
		}
		return data.gateways
	} catch (error: any) {
		throw new Error(error.message || 'Error on connecting to server.')
	}
}

export const getNodes = async () => {
	try {
		const res = await axios.get(
			`${import.meta.env.VITE_SERVER_BASE_URL}/product/get-nodes`,
			{ withCredentials: true }
		)

		const data = res.data
		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on getting-Nodes: Undefined error')
		}
		return data
	} catch (error: any) {
		throw new Error(error.message || 'Error on connecting to server.')
	}
}

export const getActiveNodes = async () => {
	try {
		const res = await axios.get(
			`${import.meta.env.VITE_SERVER_BASE_URL}/product/get-active-nodes`,
			{ withCredentials: true }
		)

		const data = res.data
		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on getting-Nodes: Undefined error')
		}
		return data.nodes
	} catch (error: any) {
		throw new Error(error.message || 'Error on connecting to server.')
	}
}

export const createNodeRequest = async (nodes: ICreateNode[]) => {
	try {
		const res = await axios.post(
			`${import.meta.env.VITE_SERVER_BASE_URL}/product/create-nodes`,
			nodes,
			{
				withCredentials: true,
			}
		)
		const data = res.data

		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on creating node')
		}

		return data
	} catch (error: any) {
		// Axios error handling
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message || 'Error on creating node')
		}
		// Other errors
		throw new Error(error.message || 'Error on creating node: Undefined error.')
	}
}

export const createGatewayRequest = async (nodes: ICreateGateway) => {
	try {
		const res = await axios.post(
			`${import.meta.env.VITE_SERVER_BASE_URL}/product/create-gateway`,
			nodes,
			{
				withCredentials: true,
			}
		)
		const data = res.data

		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on creating node')
		}

		return data
	} catch (error: any) {
		// Axios error handling
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message || 'Error on creating node')
		}
		// Other errors
		throw new Error(error.message || 'Error on creating node: Undefined error.')
	}
}

//  ============= PRODUCT related requests ============ //

//  ============= CLIENT related requests ============ //

export const createBuildingRequest = async (buildingData: ICreateBuilding) => {
	try {
		const res = await axios.post(
			`${import.meta.env.VITE_SERVER_BASE_URL}/company/create-building`,
			buildingData,
			{
				withCredentials: true,
			}
		)
		const data = res.data

		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on creating node')
		}

		return data
	} catch (error: any) {
		// Axios error handling
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message || 'Error on creating node')
		}
		// Other errors
		throw new Error(error.message || 'Error on creating node: Undefined error.')
	}
}

export const createClientRequest = async (clientData: ICreateClient) => {
	try {
		const res = await axios.post(
			`${import.meta.env.VITE_SERVER_BASE_URL}/company/create-client`,
			clientData,
			{
				withCredentials: true,
			}
		)
		const data = res.data

		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on creating node')
		}

		return data
	} catch (error: any) {
		// Axios error handling
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message || 'Error on creating node')
		}
		// Other errors
		throw new Error(error.message || 'Error on creating node: Undefined error.')
	}
}

export const getActiveBuildings = async () => {
	try {
		const res = await axios.get(
			`${import.meta.env.VITE_SERVER_BASE_URL}/company/get-active-buildings`,
			{ withCredentials: true }
		)

		const data = res.data
		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on getting-Nodes: Undefined error')
		}
		return data.buildings
	} catch (error: any) {
		throw new Error(error.message || 'Error on connecting to server.')
	}
}

export const fetchClients = async (): Promise<IClient[]> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 1000))

		const response = await axios.get(
			`${import.meta.env.VITE_SERVER_BASE_URL}/company/clients`
		)
		const data = response.data

		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on creating node')
		}

		return data.clients
	} catch (error: any) {
		// Xatoni React Queryga yuborish uchun qayta o'rash
		throw new Error(
			error.response?.data?.message ||
				'Server bilan bog‘lanishda xatolik yuz berdi'
		)
	}
}

export const fetchClientBuildings = async (clientId: string | undefined) => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_SERVER_BASE_URL}/company/clients/${clientId}`
		)
		const data = response.data

		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on creating node')
		}

		return data
	} catch (error: any) {
		return new Error(
			error.response?.data?.message || 'Error on fetching client data.'
		)
	}
}

export const fetchBuildings = async (
	clientId: string
): Promise<IBuilding[]> => {
	const response = await axios.get(
		`${import.meta.env.VITE_SERVER_BASE_URL}/buildings?client_id=${clientId}`
	)
	return response.data
}

export const fetchBuildingNodes = async (buildingId: string) => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_SERVER_BASE_URL}/company/buildings/${buildingId}`
		)
		const data = response.data

		if (data.state === 'fail') {
			throw new Error(data.message || 'Error on creating node')
		}

		return data.nodes
	} catch (error: any) {
		return new Error(
			error.response?.data?.message || 'Error on fetching client data.'
		)
	}
}

//  ============= CLIENT creating related requests ============ //
