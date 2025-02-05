import { apiClient, productQueryKeys } from '@/api';
import { usePagination } from '@/hooks/use-pagination';
import { useQuery } from '@tanstack/react-query';

export function useProductsPagination() {
  const [{ page, per_page }] = usePagination();

  const getProductsFn = async () => {
    const response = await apiClient.get(
      `/products?page=${page}&limit=${per_page}`
    );
    return {
      data: response.data,
      headers: response.headers,
    };
  };

  return useQuery({
    queryKey: productQueryKeys.pagination(page, per_page),
    queryFn: getProductsFn,
  });
}
