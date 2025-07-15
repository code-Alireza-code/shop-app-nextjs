"use client";

import { useGetUser } from "@/hooks/useAuth";
import { Product } from "@/types/Product";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAddToCart } from "../_/hooks/useAddToCart";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useRemoveFromCart } from "../_/hooks/useRemoveFromCart";
import Link from "next/link";

type Props = {
  product: Product;
};
function AddToCart({ product }: Props) {
  const { user, cart } = useGetUser();
  const { addToCart, isAddingToCart } = useAddToCart();
  const { removeFromCart, isRemovingFromCart } = useRemoveFromCart();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("ابتدا وارد حساب خود شوید !");
      return router.push("/auth");
    }
    await addToCart(product._id);
  };

  const isProductExistInCart =
    cart && !!cart.productDetail.some((p) => p._id === product._id);

  const cartQuantity =
    isProductExistInCart &&
    cart.productDetail.find((p) => product._id === p._id)?.quantity;

  return (
    <div>
      {cart && cart.productDetail.find((p) => p._id === product._id) ? (
        <div className="flex items-center gap-x-4 px-4 py-3 border rounded-xl w-[max-content]">
          <button
            disabled={isAddingToCart}
            className="text-primary-800 rounded-full p-1.5 hover:bg-primary-200 disabled:text-gray-800 disabled:bg-gray-100"
          >
            <FaPlus onClick={handleAddToCart} className="size-4" />
          </button>
          <span className="px-3 ">{cartQuantity}</span>
          <button
            disabled={isRemovingFromCart}
            className="text-primary-800 rounded-full p-1.5 hover:bg-primary-200 disabled:text-gray-800 disabled:bg-gray-100"
            onClick={() => {
              removeFromCart(product._id);
            }}
          >
            <FaMinus className="size-4" />
          </button>
          <div className="w-px bg-gray-600 h-8"></div>
          <Link href="/cart" className="hover:text-primary-900 hover:underline">
            مشاهده سبد خرید
          </Link>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="btn btn--primary disabled:bg-gray-400 disabled:shadow-none"
        >
          افزودن به سبد خرید
        </button>
      )}
    </div>
  );
}

export default AddToCart;

// # : commit message :"add add to cart btns + functionality + related types "
