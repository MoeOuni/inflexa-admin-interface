import { apiClient, productQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';

type paginationState = {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  search?: string;
  filters?: string;
  preset?: string;
};

export function useProductsPagination(queryObj: paginationState) {
  const getProductsFn = async () => {
    const { pageIndex, pageSize } = queryObj.pagination;
    const searchParam = queryObj?.search ? `&search=${queryObj.search}` : '';
    const filtersParam = queryObj?.filters ? `&filters=${queryObj.filters}` : '';
    const presetParam = queryObj?.preset && queryObj?.preset !== 'ALL' ? `&preset=${queryObj.preset}` : '';

    const response = await apiClient.get(
      `/products?page=${pageIndex}&limit=${pageSize}${searchParam}${filtersParam}${presetParam}`,
    );
    return {
      data: response.data,
      headers: response.headers,
    };
  };

  return useQuery({
    queryKey: ['', 'ALL', undefined, null].includes(queryObj?.preset)
      ? productQueryKeys.paginationFiltered(
          queryObj.pagination.pageIndex,
          queryObj?.filters,
        )
      : productQueryKeys.paginationPreset(
          queryObj.pagination.pageIndex,
          queryObj?.preset,
        ),
    queryFn: getProductsFn,
  });
}
