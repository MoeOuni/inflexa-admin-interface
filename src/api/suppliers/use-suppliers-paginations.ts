import { apiClient, supplierQueryKeys } from '@/api';
import { usePagination } from '@/hooks/use-pagination';
import { useQuery } from '@tanstack/react-query';

export function useSuppliersPagination() {
  const [{ page, per_page }] = usePagination();

  const getSuppliersFn = async () => {
    const response = await apiClient.get(
      `/suppliers?page=${page}&limit=${per_page}`
    );
    return {
      data: response.data,
      headers: response.headers,
    };
  };

  return useQuery({
    queryKey: supplierQueryKeys.pagination(page, per_page),
    queryFn: getSuppliersFn,
  });
}
