import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, supplierQueryKeys } from "@/api";
import { toast } from "sonner";

import type { Supplier, TSFixMe } from "@/lib/types";

const createSupplierFn = async (supplier: Supplier) => {
    const response = await apiClient.post("/suppliers", supplier);
    return response;
};

export function useCreateSupplier() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSupplierFn,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: supplierQueryKeys.all,
            });
            toast.success("Supplier created successfully ");
        },
        onError: (error: TSFixMe) => {
            toast.error(
                error?.response?.data?.message || "An error occurred. Please try again."
            );
        },
    });
}
