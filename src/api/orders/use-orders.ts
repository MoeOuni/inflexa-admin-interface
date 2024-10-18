/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient, orderQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useOrders({ params }: { params?: any }) {
  const getOrdersFn = async () => {
    const endpoint = params?.status ? `/orders?status=${params.status}` : '/orders';
    const response = await apiClient.get(endpoint);
    return response.data;
  };

  return useQuery({
    queryKey: params?.status
      ? orderQueryKeys.status(params?.status)
      : orderQueryKeys.all,
    queryFn: getOrdersFn,
  });
}
