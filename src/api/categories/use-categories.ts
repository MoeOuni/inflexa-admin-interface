import { apiClient, categoryQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';


const getCategoriesFn = async () => {
    const response = await apiClient.get('/categories');
    return response.data;
}

export function useCategores() {
    return useQuery(
        {
            queryKey: categoryQueryKeys.all,
            queryFn: getCategoriesFn
        }
    )
}