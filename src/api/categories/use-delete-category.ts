import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryQueryKeys, apiClient } from '@/api';
import { toast } from 'sonner';

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    const deleteCateogry = async (id: string) => {
        const response = await apiClient.delete(`/categories/${id}`);
        return response;
    }

    return useMutation(
        {
            mutationFn: deleteCateogry,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
                toast.success('Category deleted successfully');
            },
            onMutate: async () => {
                await queryClient.cancelQueries({ queryKey: categoryQueryKeys.all });
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || 'An error occurred. Please try again.');
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
            },
        }
    )
}
