// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const purchaseQueryKeys = {
    all: ['purchases'],
    details: () => [...purchaseQueryKeys.all, 'detail'],
    detail: (id: number) => [...purchaseQueryKeys.details(), id],
    pagination: (page: number) => [...purchaseQueryKeys.all, 'pagination', page],
    infinite: () => [...purchaseQueryKeys.all, 'infinite'],
};