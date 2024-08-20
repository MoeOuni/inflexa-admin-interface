// /orders/update-status/:id/
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, orderQueryKeys } from '@/api';
import { toast } from 'sonner';
import type { TSFixMe } from '@/lib/types';

interface IParams {
  id: string;
  status: string;
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  const updateOrderStatusFn = async (params: IParams) => {
    const response = await apiClient.patch(
      `/orders/update-status/${params.id}/?status=${params.status}`
    );
    return response;
  };

  return useMutation({
    mutationFn: updateOrderStatusFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: orderQueryKeys.all });
    },
    onSuccess: () => {
      toast.success('Order status updated successfully');
    },
    onError: (error: TSFixMe) => {
      toast.error(
        error?.response?.data?.message || 'An error occurred. Please try again.'
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: orderQueryKeys.all });
    },
  });
}
