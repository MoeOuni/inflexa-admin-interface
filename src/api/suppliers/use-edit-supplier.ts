import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, supplierQueryKeys } from '@/api';
import { toast } from 'sonner';

import type { Supplier, TSFixMe } from '@/lib/types';

export function useEditSupplier({ status }: { status: string }) {
    const queryClient = useQueryClient();

    const editSupplierFN = async (supplier: Supplier) => {
        const response = await apiClient.patch(
            `/suppliers/${supplier._id}`,
            supplier
        );
        return response;
    }

    return useMutation({
        mutationFn: editSupplierFN,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: [supplierQueryKeys.all, status] });
        },
        onSuccess: () => {
            toast.success('Supplier updated successfully');
        },
        onError: (error: TSFixMe) => {
            toast.error(
                error?.response?.data?.message || 'An error occurred. Please try again.'
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [supplierQueryKeys.all, status] });
        },
    });
}