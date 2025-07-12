import { getAllCategoriesApi } from "@/services/categoryService";
import { getAllProductsApi } from "@/services/productService";
import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { useQueries } from "@tanstack/react-query";

export const useProductsData = (query = "") => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["all-products", query],
        queryFn: () => getAllProductsApi(query),
        retry: 2,
      },
      {
        queryKey: ["all-categories"],
        queryFn: () => getAllCategoriesApi(),
        retry: 2,
      },
    ],
  });

  const products: Product[] = results[0].data?.products ?? [];
  const categories: Category[] = results[1].data?.categories ?? [];

  return { products, categories };
};
