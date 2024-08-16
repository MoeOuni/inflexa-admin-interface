// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const configQueryKeys = {
    all: ['config'],
    details: () => [...configQueryKeys.all, 'detail'],
    detail: (id: string) => [...configQueryKeys.details(), id],
    pagination: (page: number) => [...configQueryKeys.all, 'pagination', page],
    infinite: () => [...configQueryKeys.all, 'infinite'],
};