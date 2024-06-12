import { apiClient, customerQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';

const getCustomersFn = async () => {
    const response = await apiClient.get('/customers');
    return response.data;
}

export function useCustomers() {
    return useQuery({
        queryKey: customerQueryKeys.all,
        queryFn: getCustomersFn
    });
}