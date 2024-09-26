import { apiClient, orderQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useOrders({ params }: { params?: any }) {
  const getOrdersFn = async () => {
    const response = await apiClient.get(
      `/orders${params?.status ? `?status=${params.status}` : ''}`
    );
    return response.data;
  };

  return useQuery({
    queryKey: params?.status
      ? orderQueryKeys.status(params?.status)
      : orderQueryKeys.all,
    queryFn: getOrdersFn,
  });
}
