import { addCategoryApi } from "@/services/categoryService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addCategory, isPending: isAddingCategory } = useMutation(
    {
      mutationFn: addCategoryApi,
      retry: 2,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["all-categories"] });
        toast.success(data?.message || "دسته بندی با موفقیت ایجاد شد !");
      },
      onError: (err: unknown) => {
        toast.success(
          (err as BackendError).response.data.message ||
            "خطا هنگام افزودن دسته بندی !"
        );
      },
    }
  );

  return { addCategory, isAddingCategory };
};
