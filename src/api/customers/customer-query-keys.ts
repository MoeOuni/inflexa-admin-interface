// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const customerQueryKeys = {
    all: ['customers'],
    details: () => [...customerQueryKeys.all, 'detail'],
    detail: (id: string) => [...customerQueryKeys.details(), id],
    pagination: (page: number) => [...customerQueryKeys.all, 'pagination', page],
    infinite: () => [...customerQueryKeys.all, 'infinite'],
};