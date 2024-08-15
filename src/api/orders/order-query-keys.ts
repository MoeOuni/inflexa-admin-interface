export const orderQueryKeys = {
    all: ['orders'],
    details: () => [...orderQueryKeys.all, 'detail'],
    detail: (id: string) => [...orderQueryKeys.details(), id],
    pagination: (page: number) => [...orderQueryKeys.all, 'pagination', page],
    infinite: () => [...orderQueryKeys.all, 'infinite'],
};