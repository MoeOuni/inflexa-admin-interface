import { apiClient, orderQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useOrders({ params }: { params?: string }) {
  const getOrdersFn = async () => {
    const response = await apiClient.get(
      `/orders${params}`
    );
    return response.data;
  };

  return useQuery({
    queryKey: orderQueryKeys.all,
    queryFn: getOrdersFn,
  });
}
