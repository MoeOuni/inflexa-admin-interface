// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const permissionQueryKeys = {
    all: ['permissions'],
    details: () => [...permissionQueryKeys.all, 'detail'],
    detail: (id: string) => [...permissionQueryKeys.details(), id],
    pagination: (page: number) => [...permissionQueryKeys.all, 'pagination', page],
    infinite: () => [...permissionQueryKeys.all, 'infinite'],
};