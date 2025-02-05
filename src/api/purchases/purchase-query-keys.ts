// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const purchaseQueryKeys = {
  all: ['purchases'],
  details: () => [...purchaseQueryKeys.all, 'detail'],
  detail: (id: string) => [...purchaseQueryKeys.details(), id],
  pagination: (page: number, per_page: number) => [
    ...purchaseQueryKeys.all,
    'pagination',
    per_page,
    page,
  ],
  infinite: () => [...purchaseQueryKeys.all, 'infinite'],
};
