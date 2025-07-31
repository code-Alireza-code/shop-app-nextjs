"use client";

import { useGetProductById } from "@/hooks/useProduct";
import AddProductForm from "../../_/components/AddProductForm";
import { useParams } from "next/navigation";
import Loading from "@/ui/Loading";

function EditProductPage() {
  const { id } = useParams();

  const { product, isLoadingProduct } = useGetProductById(id as string);

  if (isLoadingProduct) return <Loading />;
  return (
    <div>
      <AddProductForm product={product} />
    </div>
  );
}

export default EditProductPage;
