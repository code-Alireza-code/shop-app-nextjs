import { deleteCategoryApi } from "@/services/categoryService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteCategory, isPending: isDeletingCategory } =
    useMutation({
      mutationFn: deleteCategoryApi,
      retry: 2,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["all-categories"] });
        toast.success(data?.message || "دسته بندی با موفقیت خذف شد !");
      },
      onError: (err: unknown) => {
        toast.success(
          (err as BackendError).response.data.message ||
            "خطا هنگام حذف دسته بندی !"
        );
      },
    });

  return { deleteCategory, isDeletingCategory };
};
