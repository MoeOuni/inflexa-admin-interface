import { apiClient, purchaseQueryKeys } from '@/api';
import { usePagination } from '@/hooks/use-pagination';
import { useQuery } from '@tanstack/react-query';

export function usePurchasesPagination() {
  const [{ page, per_page }] = usePagination();

  const getPurchasesFn = async () => {
    const response = await apiClient.get(
      `/purchases?page=${page}&limit=${per_page}`
    );
    return {
      data: response.data,
      headers: response.headers,
    };
  };

  return useQuery({
    queryKey: purchaseQueryKeys.pagination(page, per_page),
    queryFn: getPurchasesFn,
  });
}
