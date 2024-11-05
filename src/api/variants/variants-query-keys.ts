// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const variantQueryKeys = {
  all: ['variants'],
  details: () => [...variantQueryKeys.all, 'detail'],
  detail: (id?: string) => [...variantQueryKeys.details(), id],
  pagination: (page: string) => [...variantQueryKeys.all, 'pagination', page],
  infinite: () => [...variantQueryKeys.all, 'infinite'],
};
