// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const productQueryKeys = {
    all: ['products'],
    details: () => [...productQueryKeys.all, 'detail'],
    detail: (id: string) => [...productQueryKeys.details(), id],
    pagination: (page: number) => [...productQueryKeys.all, 'pagination', page],
    infinite: () => [...productQueryKeys.all, 'infinite'],
};