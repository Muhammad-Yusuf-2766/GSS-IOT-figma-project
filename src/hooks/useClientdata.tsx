import { fetchClientData, fetchClients } from '@/services/apiRequests'
import { IClient } from '@/types/interfaces'
import { useQuery } from '@tanstack/react-query'

// ==========================================================================================================
//    Bu React-Query Hook bo'lib reusable hook hsioblanadi. clientId o'zgarganda react-query ma'lumotlarni qaytadan yuklashi uchun clientId yozish kerak. ['clients'clientId] //
// ==========================================================================================================

export const useAllClients = () => {
	return useQuery<IClient[]>({
		queryKey: ['clients'],
		queryFn: fetchClients,
	})
}

export const useClientData = (clientId: string) => {
	return useQuery<IClient>({
		queryKey: ['clients', clientId],
		queryFn: () => fetchClientData(clientId),
	})
}
