import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supplierQueryKeys, apiClient } from "@/api";
import { toast } from "sonner";

export function useRestoreSupplier({ status }: { status: string }) {
    const queryClient = useQueryClient();

    const restoreSupplierFN = async (id: string) => {
        const response = await apiClient.patch(`/suppliers/${id}/restore`);
        return response;
    };

    return useMutation({
        mutationFn: restoreSupplierFN,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [supplierQueryKeys.all, status] });
            toast.success("Supplier restored successfully");
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: [supplierQueryKeys.all, status] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "An error occurred. Please try again."
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [supplierQueryKeys.all, status] });
        },
    });
}