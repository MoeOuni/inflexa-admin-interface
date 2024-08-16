// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const logQueryKeys = {
    all: ['logs'],
    details: () => [...logQueryKeys.all, 'detail'],
    detail: (id: string) => [...logQueryKeys.details(), id],
    pagination: (page: number) => [...logQueryKeys.all, 'pagination', page],
    infinite: () => [...logQueryKeys.all, 'infinite'],
};