"use client";

import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";
import CategoriesTable from "./_/components/CategoriesTable";
import { useGetAllCategories } from "@/hooks/useCategory";
import Loading from "@/ui/Loading";

function CategoriesPage() {
  const { categories, isLoadingCategories } = useGetAllCategories();

  if (isLoadingCategories) return <Loading />;
  return (
    <div>
      <div className="flex items-center justify-between pt-2">
        <h1 className="text-xl font-bold mb-5">دسته بندی ها</h1>
        <Link href="/admin/categories/add">
          <button className="btn btn--secondary text-sm flex gap-x-2 items-center">
            <IoMdAddCircleOutline className="size-5" />
            <span>افزودن محصول</span>
          </button>
        </Link>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  );
}

export default CategoriesPage;
