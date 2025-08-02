"use client";

import { useParams } from "next/navigation";
import AddCategoryForm from "../../_/components/AddCategoryForm";
import { useGetCategoryById } from "@/hooks/useCategory";
import Loading from "@/ui/Loading";

function EditCategoryPage() {
  const { categoryId } = useParams();
  const { category, isLoadingCategory } = useGetCategoryById(
    categoryId as string
  );

  if (isLoadingCategory) return <Loading />;
  return (
    <div>
      <AddCategoryForm category={category} />
    </div>
  );
}

export default EditCategoryPage;
