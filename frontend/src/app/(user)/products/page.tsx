"use client";

import { useGetAllCategories } from "@/hooks/useCategory";
import { useGetAllProducts } from "@/hooks/useProduct";
import CategorySidebar from "./[slug]/CategorySidebar";
import queryString from "query-string";
import { useSearchParams } from "next/navigation";

function ProductsPage() {
  const searchParams = useSearchParams();
  const { products, isLoadingProducts } = useGetAllProducts(
    queryString.stringify(Object.fromEntries(searchParams.entries()))
  );
  const { categories, isLoadingCategories } = useGetAllCategories();

  console.log(
    queryString.stringify(Object.fromEntries(searchParams.entries()))
  );

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">صفحه محصولات</h1>
      <div className="grid grid-cols-4">
        <CategorySidebar categories={categories} />
        <div className="col-span-3 grid grid-cols-3 gap-4 auto-rows-max">
          {products?.map((product) => (
            <div
              key={product._id}
              className="rounded-xl text-center shadow-md p-4"
            >
              <h2 className="font-bold">{product.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
