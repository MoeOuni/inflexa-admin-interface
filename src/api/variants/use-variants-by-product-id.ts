import { apiClient, variantQueryKeys } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import type { TSFixMe } from '@/lib/types';
import { toast } from 'sonner';

export function useVariantsByProductId() {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const getVariantByProductIdFn = async () => {
    if (id) {
      const { data } = await apiClient.get(`/variants/${id}`);
      return data;
    }
  };

  return useMutation({
    mutationFn: getVariantByProductIdFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: variantQueryKeys.all });
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message ||
          'An error occurred while loading the configuration. Please try again.',
      );
    },
  });
}
