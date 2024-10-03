// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const productQueryKeys = {
  all: ['products'],
  details: () => [...productQueryKeys.all, 'detail'],
  detail: (id: string) => [...productQueryKeys.details(), id],
  pagination: (page: number) => [...productQueryKeys.all, 'pagination', page],
  paginationFiltered: (page: number, filters?: string) => [
    ...productQueryKeys.pagination(page),
    filters,
  ],
  paginationPreset: (page: number, preset?: string) => [
    ...productQueryKeys.pagination(page),
    preset,
  ],
  infinite: () => [...productQueryKeys.all, 'infinite'],
};
