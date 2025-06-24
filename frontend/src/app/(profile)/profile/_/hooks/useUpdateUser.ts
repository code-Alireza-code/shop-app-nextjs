import { updateUserApi } from "@/services/authService";
import { BackendError } from "@/types/Error";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
  const { mutateAsync: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err: unknown) => {
      toast.success(
        (err as BackendError).response.data.message ||
          "خطا هنگام ویرایش پروفایل !"
      );
    },
  });

  return { updateUser, isUpdating };
};
