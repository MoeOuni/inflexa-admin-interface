import { apiClient, logQueryKeys } from '@/api';
import { useQuery } from '@tanstack/react-query';

const getLogsFn = async () => {
  const response = await apiClient.get('/logs');
  return response.data;
};

export function useLogs() {
  return useQuery({
    queryKey: logQueryKeys.all,
    queryFn: getLogsFn,
  });
}
