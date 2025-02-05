export const customerQueryKeys = {
  all: ['customers'],
  details: () => [...customerQueryKeys.all, 'detail'],
  detail: (id: string) => [...customerQueryKeys.details(), id],
  pagination: (page: number, per_page: number) => [
    ...customerQueryKeys.all,
    'pagination',
    per_page,
    page,
  ],
  infinite: () => [...customerQueryKeys.all, 'infinite'],
};
