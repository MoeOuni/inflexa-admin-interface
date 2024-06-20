import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, customerQueryKeys } from '@/api';
import { toast } from 'sonner';

import { TSFixMe } from '@/lib/types';
import { APISaveCustomer } from '@/lib/interfaces';

const createCustomerFn = async (customer: APISaveCustomer) => {
    const response = await apiClient.post('/customers/init', customer);
    return response;
}

export function useCreateCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCustomerFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: customerQueryKeys.all });
            toast.success('Customer created successfully');
        },
        onError: (error: TSFixMe) => {
            toast.error(error?.response?.data?.message || 'An error occurred. Please try again.');
        }
    })
}