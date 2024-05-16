import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, categoryQueryKeys } from '@/api';
import { toast } from 'sonner';

import type { Category, TSFixMe } from '@/types';

const createCategoryFn = async (category: Category) => {
    const response = await apiClient.post('/categories', category);
    return response;
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: createCategoryFn,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
                toast.success('Category created successfully');
            },
            onError: (error: TSFixMe) => {
                toast.error(error?.response?.data?.message || 'An error occurred. Please try again.');
            }
        }
    )
}

