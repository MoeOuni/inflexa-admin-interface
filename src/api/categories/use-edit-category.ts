import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, categoryQueryKeys } from "@/api";
import { toast } from "sonner";
import type { Category, TSFixMe } from "@/lib/types";

export function useEditCategory() {
    const queryClient = useQueryClient();

    const editCategoryFn = async (category: Category) => {
        const response = await apiClient.put(
            `/categories/${category._id}`,
            category
        );
        return response;
    };

    return useMutation({
        mutationFn: editCategoryFn,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: categoryQueryKeys.all });
        },
        onSuccess: () => {
            toast.success("Category updated successfully");
        },
        onError: (error: TSFixMe) => {
            toast.error(
                error?.response?.data?.message || "An error occurred. Please try again."
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all });
        },
    });
}
