"use client";

import { Category } from "@/types/Category";
import ProductFilter from "../_components/ProductFilter";
import ProductSort from "../_components/ProductSort";

type Props = {
  categories: Category[];
};

function CategorySidebar({ categories }: Props) {
  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <ProductFilter categories={categories} />
      <ProductSort />
    </div>
  );
}

export default CategorySidebar;
