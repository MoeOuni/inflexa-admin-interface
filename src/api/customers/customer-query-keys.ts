export const customerQueryKeys = {
    all: ['customers'],
    details: () => [...customerQueryKeys.all, 'detail'],
    detail: (id: string) => [...customerQueryKeys.details(), id],
    pagination: (page: number) => [...customerQueryKeys.all, 'pagination', page],
    infinite: () => [...customerQueryKeys.all, 'infinite'],
};