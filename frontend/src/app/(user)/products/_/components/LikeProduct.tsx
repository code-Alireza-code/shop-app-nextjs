"use client";
import { Product } from "@/types/Product";
import { MouseEvent } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useLikeProduct } from "../hooks/useLikeProduct";

type Props = {
  product: Product;
};

function LikeProduct({ product }: Props) {
  const { likeProduct } = useLikeProduct();

  const handleLikeProduct = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await likeProduct(product._id);
  };

  return (
    <div className="absolute left-4">
      <button className="p-0.5 rounded-full" onClick={handleLikeProduct}>
        {product.isLiked ? (
          <MdFavorite className="size-5 text-red-500" />
        ) : (
          <MdFavoriteBorder className="size-5 hover:text-red-500" />
        )}
      </button>
    </div>
  );
}

export default LikeProduct;
