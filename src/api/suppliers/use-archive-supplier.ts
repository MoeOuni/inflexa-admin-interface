import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supplierQueryKeys, apiClient } from "@/api";
import { toast } from "sonner";

export function useArchiveSupplier({ status }: { status: string }) {
    const queryClient = useQueryClient();

    const archiveSupplierFN = async (id: string) => {
        const response = await apiClient.patch(`/suppliers/${id}/archive`);
        return response;
    };

    return useMutation({
        mutationFn: archiveSupplierFN,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [supplierQueryKeys.all, status] });
            toast.success("Supplier archived successfully");
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
