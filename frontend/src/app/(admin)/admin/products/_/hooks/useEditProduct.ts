import { editProductApi } from "@/services/productService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: editProduct, isPending: isEditingProduct } = useMutation(
    {
      mutationFn: editProductApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["all-products"] });
        toast.success(data?.message || "محصول با موفقیت ویرایش شد !");
      },
      onError: (err: unknown) => {
        toast.success(
          (err as BackendError).response.data.message ||
            "خطا هنگام ویرایش محصول!"
        );
      },
    }
  );

  return { editProduct, isEditingProduct };
};
