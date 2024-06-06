import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, inventoryQueryKeys } from "@/api";
import { toast } from "sonner";
import type { APICreateInventory } from "@/lib/interfaces";
import { TSFixMe } from "@/lib/types";

const createInventoryFN = async (inventory: APICreateInventory) => {
    const response = await apiClient.post("/inventory", inventory);
    return response;
}

export function useCreateInventory() {
    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: createInventoryFN,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: inventoryQueryKeys.all });
                toast.success("Inventory created successfully.");
            },
            onError: (error: TSFixMe) => {
                toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
            }
        }
    )
}