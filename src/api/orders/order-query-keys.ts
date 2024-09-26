export const orderQueryKeys = {
    all: ['orders'],
    status: (status: string) => [...orderQueryKeys.all, 'status', status],
    details: () => [...orderQueryKeys.all, 'detail'],
    detail: (id: string) => [...orderQueryKeys.details(), id],
    pagination: (page: number) => [...orderQueryKeys.all, 'pagination', page],
    infinite: () => [...orderQueryKeys.all, 'infinite'],
};