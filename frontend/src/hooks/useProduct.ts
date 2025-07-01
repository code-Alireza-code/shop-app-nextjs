import { getAllProductsApi } from "@/services/productService";
import { Product } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = () => {
  const { data, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => getAllProductsApi(),
    retry: 2,
  });

  const { products }: { products: Product[] } = data || {};

  return { products, isLoadingProducts };
};
