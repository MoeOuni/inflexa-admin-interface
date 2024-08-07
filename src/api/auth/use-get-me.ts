import { apiClient, authQueryKeys } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { TSFixMe } from '@/lib/types';

const getMeFn = async () => {
  const response = await apiClient.get('/me');
  return response.data;
};

export function useGetMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getMeFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.details(),
      });
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message || 'An error occurred. Please try again.'
      );
    },
  });
}
