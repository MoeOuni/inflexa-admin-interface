// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const inventoryQueryKeys = {
    all: ['inventories'],
    details: () => [...inventoryQueryKeys.all, 'detail'],
    detail: (id: number) => [...inventoryQueryKeys.details(), id],
    pagination: (page: number) => [...inventoryQueryKeys.all, 'pagination', page],
    infinite: () => [...inventoryQueryKeys.all, 'infinite'],
};