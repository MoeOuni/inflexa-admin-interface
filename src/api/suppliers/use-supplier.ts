import { apiClient, supplierQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";



export function useSuppliers({ status }: { status: string }) {
    const getSuppliersFn = async () => {
        const { data } = await apiClient.get(`/suppliers/?status=${status}`);
        return data;
    };
    return useQuery({
        queryKey: [supplierQueryKeys.all, status],
        queryFn: getSuppliersFn,
    });
}
