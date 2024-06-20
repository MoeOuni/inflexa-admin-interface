import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, purchaseQueryKeys } from "@/api";
import { toast } from "sonner";
import type { TSFixMe } from "@/lib/types";
import type { APIPurchase } from "@/lib/interfaces";


export function useUpdatePurchase() {
    const queryClient = useQueryClient();

    const updatePurchaseFN = async (purchase: APIPurchase) => {
        const response = await apiClient.patch(`/purchases/${purchase?._id}`, purchase);
        return response;
    }

    return useMutation({
        mutationFn: updatePurchaseFN,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: purchaseQueryKeys.all });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: purchaseQueryKeys.all });
            toast.success("Purchase updated successfully.");
        },
        onError: (error: TSFixMe) => {
            toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: purchaseQueryKeys.all });
        },
    });
}