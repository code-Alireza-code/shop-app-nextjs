import { removeProductApi } from "@/services/productService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRemoveProduct = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: removeProduct, isPending: isRemovingProduct } =
    useMutation({
      mutationFn: removeProductApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["all-products"] });
        toast.success(data?.message || "محصول با موفقیت حذف شد !");
      },
      onError: (err: unknown) => {
        toast.success(
          (err as BackendError).response.data.message || "خطا هنگام حذف محصول!"
        );
      },
    });

  return { removeProduct, isRemovingProduct };
};
