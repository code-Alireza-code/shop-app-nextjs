"use client";

import CategorySidebar from "./[slug]/CategorySidebar";
import queryString from "query-string";
import { useSearchParams } from "next/navigation";
import { useProductsData } from "@/hooks/useProductsData";
import toLocaleDateString from "@/utils/dateFormatter";
import Link from "next/link";

import React, { Suspense } from "react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const { categories, products } = useProductsData(
    queryString.stringify(Object.fromEntries(searchParams.entries()))
  );

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">صفحه محصولات</h1>
      <div className="grid grid-cols-4">
        <CategorySidebar categories={categories} />
        <div className="col-span-3 grid grid-cols-3 gap-4 auto-rows-max">
          {products?.map((product) => (
            <Link
              href={`/products/${product.slug}`}
              key={product._id}
              className="hover:shadow-xl hover:scale-105 m-2"
            >
              <div className="rounded-xl border text-center shadow-md p-4">
                <h2 className="font-bold text-xl mb-4">{product.title}</h2>
                <div className="mb-4">
                  <span>تاریخ ساخت‌: </span>
                  <span className="font-bold">
                    {toLocaleDateString(product.createdAt)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}

export default ProductsPage;
