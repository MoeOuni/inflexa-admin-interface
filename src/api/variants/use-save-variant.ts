import { apiClient } from '@/api';
import { TSFixMe } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useSaveVariant() {
  const queryClient = useQueryClient();

  const saveVariantFn = async (payload: TSFixMe) => {
    return await apiClient.post(`/variants`, payload);
  };

  return useMutation({
    mutationFn: saveVariantFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['variants'] });
      toast.success('Variant saved successfully.');
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message ||
          'An error occurred. Please try again.',
      );
    },
  });
}
