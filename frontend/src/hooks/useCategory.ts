import { getAllCategoriesApi } from "@/services/categoryService";
import { Category } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  const { data, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["all-categories"],
    queryFn: () => getAllCategoriesApi(),
    retry: 2,
  });

  const { categories }: { categories: Category[] } = data || {};

  return { categories, isLoadingCategories };
};
