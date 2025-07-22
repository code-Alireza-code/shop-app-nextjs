"use client";

import { useParams } from "next/navigation";

function SingleProductPage() {
  const { productId } = useParams<{ productId: string }>();
  // get product data by id
  console.log(productId);

  return <div></div>;
}

export default SingleProductPage;
