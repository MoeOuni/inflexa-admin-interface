import { useMutation, useQueryClient } from "@tanstack/react-query";
import {apiClient, productQueryKeys} from "@/api";
import {toast} from "sonner";

import type {APIUpdateProduct} from "@/lib/interfaces"
import type { TSFixMe } from "@/lib/types";

type MutateFnType = {
    id: string;
    product: APIUpdateProduct;
};

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    const updateProductFn = async ({id , product}: MutateFnType) => {
        const response = await apiClient.patch(`/products/${id}`, product);
        return response;
    };

    return useMutation({
        mutationFn: updateProductFn,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: productQueryKeys.all });
        },
        onSuccess: () => {
            toast.success("Product updated successfully");
        },
        onError: (error: TSFixMe) => {
            toast.error(
                error?.response?.data?.message || "An error occurred. Please try again."
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
        }
    });
}