import { getAllProductsApi } from "@/services/productService";
import { Product } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = (query: string = "") => {
  const { data, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["all-products", query],
    queryFn: () => getAllProductsApi(query),
    retry: 2,
  });

  const { products }: { products: Product[] } = data || {};

  return { products, isLoadingProducts };
};
