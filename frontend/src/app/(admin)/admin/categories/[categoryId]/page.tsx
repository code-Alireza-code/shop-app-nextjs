"use client";
import { useParams } from "next/navigation";

function SingleCategoryPage() {
  const { categoryId } = useParams();
  console.log(categoryId);
  return <div>single category page</div>;
}

export default SingleCategoryPage;
