import { removeFromCartApi } from "@/services/cartService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import toast from "react-hot-toast";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const lastToastRef = useRef<string | null>(null);
  const { mutateAsync: removeFromCart, isPending: isRemovingFromCart } =
    useMutation({
      mutationFn: removeFromCartApi,
      onSuccess: (data) => {
        // Dismiss the previous toast
        if (lastToastRef.current) {
          toast.dismiss(lastToastRef.current);
        }

        // Show new toast and store its ID
        lastToastRef.current = toast.success(
          data.message || "محصول از سبد خرید کم شد !"
        );
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      },
      onError: (err: unknown) => {
        if (lastToastRef.current) {
          toast.dismiss(lastToastRef.current);
        }
        lastToastRef.current = toast.error(
          (err as BackendError).response.data.message ||
            "خطا هنگام کم کردن محصول از سبد خرید !"
        );
      },
    });

  return { removeFromCart, isRemovingFromCart };
};
