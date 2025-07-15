import { removeFromCartApi } from "@/services/cartService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: removeFromCart, isPending: isRemovingFromCart } =
    useMutation({
      mutationFn: removeFromCartApi,
      onSuccess: (data) => {
        toast.success(data.message || "محصول از سبد خرید کم شد !");
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      },
      onError: (err: unknown) => {
        toast.error(
          (err as BackendError).response.data.message ||
            "خطا هنگام کم کردن محصول از سبد خرید !"
        );
      },
    });

  return { removeFromCart, isRemovingFromCart };
};
