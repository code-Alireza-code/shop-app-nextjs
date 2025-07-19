import { likeProductApi } from "@/services/productService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLikeProduct = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: likeProduct, isPending: isLikingProduct } = useMutation({
    mutationFn: likeProductApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      toast.success(data.message || "لایک/آنلایک با موفقیت انجام شد !");
    },
    onError: (error: unknown) => {
      toast.error(
        (error as BackendError).response.data.message ||
          "خطا در هنگام لایک/آنلایک"
      );
    },
  });

  return { likeProduct, isLikingProduct };
};
