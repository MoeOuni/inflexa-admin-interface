export const cronTasksQueryKeys = {
  all: ['cron-tasks'],
  details: () => [...cronTasksQueryKeys.all, 'detail'],
  detail: (id: string) => [...cronTasksQueryKeys.details(), id],
  pagination: (page: number, per_page: number) => [
    ...cronTasksQueryKeys.all,
    'pagination',
    per_page,
    page,
  ],
  paginationFiltered: (page: number, per_page: number, filters?: string) => [
    ...cronTasksQueryKeys.pagination(page, per_page),
    filters,
  ],
  paginationPreset: (page: number, per_page: number, preset?: string) => [
    ...cronTasksQueryKeys.pagination(page, per_page),
    preset,
  ],
  infinite: () => [...cronTasksQueryKeys.all, 'infinite'],
};
