import { apiClient, permissionQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';

const getPermissionsFn = async () => {
    const response = await apiClient.get('/permissions');
    return response.data;
};

export function usePermissions() {
    return useQuery(
        {
            queryKey: permissionQueryKeys.all,
            queryFn: getPermissionsFn
        }
    )
}