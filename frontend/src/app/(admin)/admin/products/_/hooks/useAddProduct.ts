import { addProductApi } from "@/services/productService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addProduct, isPending: isAddingProduct } = useMutation({
    mutationFn: addProductApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      toast.success(data?.message || "محصول با موفقیت ایجاد شد !");
    },
    onError: (err: unknown) => {
      toast.success(
        (err as BackendError).response.data.message || "خطا هنگام افزودن محصول!"
      );
    },
  });

  return { addProduct, isAddingProduct };
};
