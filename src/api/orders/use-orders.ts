import { apiClient, orderQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';

const getOrdersFn = async () => {
    const response = await apiClient.get('/orders');
    return response.data;
}

export function useOrders() {
    return useQuery({
        queryKey: orderQueryKeys.all,
        queryFn: getOrdersFn
    });
}