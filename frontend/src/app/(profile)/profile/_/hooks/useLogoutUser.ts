import { logoutUserApi } from "@/services/authService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: logout, isPending: isLogingOut } = useMutation({
    mutationFn: logoutUserApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(data?.message || "با موفقیت خارج شدید");
    },
    onError: (err: unknown) => {
      toast.success(
        (err as BackendError).response.data.message ||
          "خطا هنگام خروج از حساب !"
      );
    },
  });

  return { logout, isLogingOut };
};
