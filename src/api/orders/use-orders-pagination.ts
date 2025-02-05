import { apiClient, orderQueryKeys } from '@/api';
import { useFilters } from '@/hooks/use-filters';
import { usePagination } from '@/hooks/use-pagination';
import { useQuery } from '@tanstack/react-query';

export function useOrdersPagination({ defaultStatus = null }: { defaultStatus?: string | null } = {}) {
  const [{ page, per_page }] = usePagination();
  const [{ status }] = useFilters();

  const getOrdersFn = async () => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: per_page.toString(),
    });

    if (status) {
      queryParams.append('status', status);
    } else if (defaultStatus !== null) {
      queryParams.append('status', defaultStatus);
    }

    const response = await apiClient.get(`/orders?${queryParams.toString()}`);
    return {
      data: response.data,
      headers: response.headers,
    };
  };

  return useQuery({
    queryKey: orderQueryKeys.pagination(page, per_page, status),
    queryFn: getOrdersFn,
  });
}
