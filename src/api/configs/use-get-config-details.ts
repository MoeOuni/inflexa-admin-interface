import { apiClient, configQueryKeys } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';
import type { TSFixMe } from '@/lib/types';

export function useGetConfigDetails() {
  const queryClient = useQueryClient();

  const getCurrentConfig = async (id: string) => {
    const response = await apiClient.get(`/store/${id}`);
    return response.data;
  };

  return useMutation({
    mutationFn: getCurrentConfig,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: configQueryKeys.detail(response.data._id),
      });
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message ||
          'An error occurred while loading the configuration. Please try again.'
      );
    },
  });
}
