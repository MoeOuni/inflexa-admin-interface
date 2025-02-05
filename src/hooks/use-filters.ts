import { useQueryStates, parseAsString } from 'nuqs';

export function useFilters() {
  return useQueryStates({
    status: parseAsString.withDefault(''),
  });
}
