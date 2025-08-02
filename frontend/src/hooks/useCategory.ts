import {
  getAllCategoriesApi,
  getCategoryByIdApi,
} from "@/services/categoryService";
import { Category } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = (query: string = "") => {
  const { data, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["all-categories", query],
    queryFn: () => getAllCategoriesApi(query),
    retry: 2,
  });

  const { categories }: { categories: Category[] } = data || {};

  return { categories, isLoadingCategories };
};

export const useGetCategoryById = (categoryId: string) => {
  const { data, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["single-category", categoryId],
    queryFn: () => getCategoryByIdApi(categoryId),
    retry: 2,
  });

  const { category }: { category: Category } = data || {};

  return { category, isLoadingCategory };
};
