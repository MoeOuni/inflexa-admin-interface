import { apiClient, orderQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useOrderDetails(id: string) {

  const getOrdersFn = async () => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  };

  return useQuery({
    queryKey: orderQueryKeys.detail(id),
    queryFn: getOrdersFn,
  });
}
