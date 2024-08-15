import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, orderQueryKeys } from '@/api';
import { toast } from 'sonner';

import { TSFixMe } from '@/lib/types';
import { APISaveOrder } from '@/lib/interfaces';

const preOrderFn = async (order: APISaveOrder) => {
  const response = await apiClient.post('/pre-order', order);
  return response;
};

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: preOrderFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderQueryKeys.all });
      toast.success('Order created successfully');
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message || 'An error occurred. Please try again.'
      );
    },
  });
}
