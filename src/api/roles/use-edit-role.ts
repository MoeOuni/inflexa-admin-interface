import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, roleQueryKeys } from "@/api";
import { toast } from "sonner";
import type { Role, TSFixMe } from "@/lib/types";

const editRoleFn = async (role: Role) => {
    const response = await apiClient.put(`/roles/${role._id}`, role);
    return response;
};

export function useEditRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editRoleFn,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: roleQueryKeys.all });
        },
        onSuccess: () => {
            toast.success("Role updated successfully");
        },
        onError: (error: TSFixMe) => {
            toast.error(
                error?.response?.data?.message || "An error occurred. Please try again."
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: roleQueryKeys.all });
        },
    });
}
