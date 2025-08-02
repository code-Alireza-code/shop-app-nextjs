import { editCategoryApi } from "@/services/categoryService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useEditCategory = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: editCategory, isPending: isEditingCategory } =
    useMutation({
      mutationFn: editCategoryApi,
      retry: 2,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["all-categories"] });
        toast.success(data?.message || "دسته بندی با موفقیت ویرایش شد !");
      },
      onError: (err: unknown) => {
        toast.success(
          (err as BackendError).response.data.message ||
            "خطا هنگام ویرایش دسته بندی !"
        );
      },
    });

  return { editCategory, isEditingCategory };
};
