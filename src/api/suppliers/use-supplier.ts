import { apiClient, supplierQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";

const getSuppliersFn = async () => {
    const { data } = await apiClient.get('/suppliers');
    return data;
}

export function useSuppliers() {
    return useQuery(
        {
            queryKey: supplierQueryKeys.all,
            queryFn: getSuppliersFn
        }
    )
}