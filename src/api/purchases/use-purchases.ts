import { apiClient, purchaseQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";

const getPurchasesFN = async () => {
    const response = await apiClient.get("/purchases");
    return response.data;
}

export function usePurchases() {
    return useQuery({
        queryKey: purchaseQueryKeys.all,
        queryFn: getPurchasesFN
    });
}   