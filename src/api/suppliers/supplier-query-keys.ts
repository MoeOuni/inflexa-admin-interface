// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const supplierQueryKeys = {
    all: ['suppliers'],
    details: () => [...supplierQueryKeys.all, 'detail'],
    detail: (id?: string) => [...supplierQueryKeys.details(), id],
    pagination: (page: string) => [...supplierQueryKeys.all, 'pagination', page],
    infinite: () => [...supplierQueryKeys.all, 'infinite'],
};