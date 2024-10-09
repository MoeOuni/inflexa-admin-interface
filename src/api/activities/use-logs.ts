import { apiClient, logQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';

interface IQueryParams {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
}

export function useLogs(query: IQueryParams) {
  const getLogsFn = async () => {
    const { data, headers } = await apiClient.get(
      `/logs?page=${query?.pagination?.pageIndex}&limit=${query?.pagination?.pageSize}`
    );
    
    return {
      data,
      headers,
    };
  };

  return useQuery({
    queryKey: logQueryKeys.pagination(query?.pagination.pageIndex),
    queryFn: getLogsFn,
  });
}
