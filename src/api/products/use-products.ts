import {apiClient, productQueryKeys} from '@/api';
import { useQuery } from '@tanstack/react-query';

const getProductsFn = async () => {
    const response = await apiClient.get('/products');
    return response.data;
}

export function useProducts() {
    return useQuery({
        queryKey: productQueryKeys.all,
        queryFn: getProductsFn
    })
}