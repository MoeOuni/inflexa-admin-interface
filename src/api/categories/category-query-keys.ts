// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const categoryQueryKeys = {
  all: ['categories'],
  details: () => [...categoryQueryKeys.all, 'detail'],
  detail: (id: string) => [...categoryQueryKeys.details(), id],
  pagination: (page: number, per_page: number) => [
    ...categoryQueryKeys.all,
    'pagination',
    per_page,
    page,
  ],
  infinite: () => [...categoryQueryKeys.all, 'infinite'],
};
