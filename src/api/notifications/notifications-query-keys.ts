// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const notificationsQueryKeys = {
  all: ['notifications'],
  type: (type: string) => [...notificationsQueryKeys.all, type],
  details: () => [...notificationsQueryKeys.all, 'detail'],
  detail: (id: string) => [...notificationsQueryKeys.details(), id],
  pagination: (page: number) => [
    ...notificationsQueryKeys.all,
    'pagination',
    page,
  ],
  infinite: () => [...notificationsQueryKeys.all, 'infinite'],
};
