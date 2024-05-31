// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const roleQueryKeys = {
    all: ['roles'],
    details: () => [...roleQueryKeys.all, 'detail'],
    detail: (id: number) => [...roleQueryKeys.details(), id],
    pagination: (page: number) => [...roleQueryKeys.all, 'pagination', page],
    infinite: () => [...roleQueryKeys.all, 'infinite'],
};