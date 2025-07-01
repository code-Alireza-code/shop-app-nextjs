"use client";

import { useGetAllCategories } from "@/hooks/useCategory";
import { useGetAllProducts } from "@/hooks/useProduct";

function ProductsPage() {
  const { products, isLoadingProducts } = useGetAllProducts();
  const { categories, isLoadingCategories } = useGetAllCategories();

  return (
    <div>
      <h1>صفحه محصولات</h1>
      <div className="grid grid-cols-4"></div>
    </div>
  );
}

export default ProductsPage;
