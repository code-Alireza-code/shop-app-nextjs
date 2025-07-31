"use client";

import { useGetAllProducts } from "@/hooks/useProduct";
import Loading from "@/ui/Loading";
import ProductsTable from "../_/components/ProductsTable";
import { IoMdAddCircleOutline } from "react-icons/io";
import Link from "next/link";

function ProductsPage() {
  const { products, isLoadingProducts } = useGetAllProducts();

  if (isLoadingProducts) return <Loading />;
  return (
    <div>
      <div className="flex items-center justify-between pt-2">
        <h1 className="text-xl font-bold mb-5">محصولات</h1>
        <Link href="/admin/products/add">
          <button className="btn btn--secondary text-sm flex gap-x-2 items-center">
            <IoMdAddCircleOutline className="size-5" />
            <span>افزودن محصول</span>
          </button>
        </Link>
      </div>
      <ProductsTable products={products} />
    </div>
  );
}

export default ProductsPage;
