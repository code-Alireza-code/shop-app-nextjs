"use client";

import { Product } from "@/types/Product";
import Link from "next/link";
import { IoMdTrash } from "react-icons/io";
import { MdEdit, MdInfo } from "react-icons/md";

type Props = {
  product: Product;
};

function ProductActions({ product }: Props) {
  const handleDeleteProduct = () => {};

  return (
    <div className="flex items-center justify-center gap-x-4">
      <Link
        className="text-primary-900 "
        href={`/admin/products/${product._id}`}
      >
        <MdInfo className="size-5" />
      </Link>
      <Link
        href={`/admin/products/edit/${product._id}`}
        className="text-green-500"
      >
        <MdEdit className="size-5" />
      </Link>
      <button className="text-error" onClick={handleDeleteProduct}>
        <IoMdTrash className="size-5" />
      </button>
    </div>
  );
}

export default ProductActions;
