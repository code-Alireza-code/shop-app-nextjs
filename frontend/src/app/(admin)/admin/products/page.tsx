"use client";

import { useGetAllProducts } from "@/hooks/useProduct";
import Loading from "@/ui/Loading";
import ProductsTable from "../_/components/ProductsTable";

function ProductsPage() {
  const { products, isLoadingProducts } = useGetAllProducts();
  console.log(products);

  if (isLoadingProducts) return <Loading />;
  return (
    <div>
      <h1 className="text-xl font-bold mb-5">محصولات</h1>

      <ProductsTable products={products} />
    </div>
  );
}

export default ProductsPage;
