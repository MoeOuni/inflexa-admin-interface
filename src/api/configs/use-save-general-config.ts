import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, configQueryKeys } from '@/api';
import { toast } from 'sonner';

import type { TSFixMe } from '@/lib/types';
import { IGeneralStore } from '@/lib/interfaces';

const saveGeneralConfigFN = async (config: {
  id: string;
  payload: IGeneralStore;
}) => {
  const response = await apiClient.patch(
    '/configs/general/' + config.id,
    config.payload
  );
  return response.data;
};

export function useSaveGeneralConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveGeneralConfigFN,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: configQueryKeys.detail(response.data._id),
      });
      toast.success(response.message || 'General configuration saved successfully.');
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message || 'An error occurred. Please try again.'
      );
    },
  });
}
