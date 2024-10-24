import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supplierQueryKeys, apiClient } from "@/api";
import { toast } from "sonner";

export function useDeleteSupplier({ status }: { status: string }) {
    const queryClient = useQueryClient();

    const deleteSupplierFN = async (id: string) => {
        const response = await apiClient.delete(`/suppliers/${id}`);
        return response;
    };

    return useMutation({
        mutationFn: deleteSupplierFN,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [supplierQueryKeys.all, status],
            });
            toast.success("Supplier deleted successfully");
        },
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: [supplierQueryKeys.all, status],
            });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "An error occurred. Please try again."
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [supplierQueryKeys.all, status],
            });
        },
    });
}
