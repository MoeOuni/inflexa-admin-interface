import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, productQueryKeys } from '@/api';
import { toast } from 'sonner';
import type { APICreateInventory } from '@/lib/interfaces';
import { TSFixMe } from '@/lib/types';

const createProductFN = async (inventory: APICreateInventory) => {
  return await apiClient.post('/products/init', inventory);
};

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductFN,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      toast.success('Inventory created successfully.');
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message ||
          'An error occurred. Please try again.',
      );
    },
  });
}
