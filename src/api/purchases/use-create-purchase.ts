import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, purchaseQueryKeys } from "@/api";
import { toast } from "sonner";
import type { TSFixMe } from "@/lib/types";
import type { APIPurchase } from "@/lib/interfaces";

const createPurchaseFN = async (purchase: APIPurchase) => {
    const response = await apiClient.post("/purchases", purchase);
    return response;
}

export function useCreatePurchase() {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn: createPurchaseFN,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: purchaseQueryKeys.all });
                toast.success("Purchase created successfully.");
            },
            onError: (error: TSFixMe) => {
                toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
            },
        }
    )
}