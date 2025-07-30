import { getAllProductsApi, getProdutByIdApi } from "@/services/productService";
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

export const useGetProductById = (productId: string) => {
  const { data, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["single-product", productId],
    queryFn: () => getProdutByIdApi(productId),
    retry: 2,
  });

  const { product }: { product: Product } = data || {};

  return { product, isLoadingProduct };
};
