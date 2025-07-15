import { addToCartApi } from "@/services/cartService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addToCart, isPending: isAddingToCart } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: (data) => {
      toast.success(data.message || "محصول به سبد خرید اضافه شد !");
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    },
    onError: (err: unknown) => {
      toast.error(
        (err as BackendError).response.data.message ||
          "خطا هنگام افزودن محصول به سبد خرید !"
      );
    },
  });

  return { addToCart, isAddingToCart };
};
