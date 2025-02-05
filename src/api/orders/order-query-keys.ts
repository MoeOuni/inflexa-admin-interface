export const orderQueryKeys = {
  all: ['orders'],
  status: (status: string) => [...orderQueryKeys.all, 'status', status],
  details: () => [...orderQueryKeys.all, 'detail'],
  detail: (id: string) => [...orderQueryKeys.details(), id],
  pagination: (page: number, per_page: number, status?: string) => [
    ...orderQueryKeys.all,
    'pagination',
    status,
    per_page,
    page,
  ],
  infinite: () => [...orderQueryKeys.all, 'infinite'],
};
