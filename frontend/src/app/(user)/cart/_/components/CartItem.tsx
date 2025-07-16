import { useAddToCart } from "@/app/(user)/products/_/hooks/useAddToCart";
import { useRemoveFromCart } from "@/app/(user)/products/_/hooks/useRemoveFromCart";
import { Cart } from "@/types/User";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numberFormatter";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi2";

type Props = { cartItem: Cart["productDetail"][number] };

function CartItem({ cartItem }: Props) {
  const queryClient = useQueryClient();
  const { addToCart, isAddingToCart } = useAddToCart();
  const { removeFromCart, isRemovingFromCart } = useRemoveFromCart();

  const handleAddProduct = async () => {
    await addToCart(cartItem._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      },
    });
  };

  const handleRemoveProduct = async (
    _e: React.MouseEvent<HTMLButtonElement>,
    removeAll = false
  ) => {
    if (removeAll) {
      let i = 0;
      for (i = 0; i < cartItem.quantity; i++) {
        await removeFromCart(cartItem._id, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-user"] });
          },
        });
      }
    } else {
      await removeFromCart(cartItem._id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["get-user"] });
        },
      });
    }
  };

  return (
    <div className="border rounded-xl p-4 flex items-center justify-between">
      <span className="flex-1 font-bold">{cartItem.title}</span>
      <div className="flex items-center justify-between gap-x-8 flex-1">
        <div>
          <div>
            قیمت :
            <span
              className={`${
                cartItem.discount ? "line-through text-gray-500" : "font-bold"
              }`}
            >
              {toPersianNumbersWithComma(cartItem.price)}
            </span>
          </div>
          {!!cartItem.discount && (
            <div className="flex items-center gap-x-2 mt-2">
              <p className="font-bold">
                {toPersianNumbersWithComma(cartItem.offPrice)}
              </p>
              <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
                {toPersianNumbers(cartItem.discount.toString())} %
              </div>
            </div>
          )}
        </div>
        <span> تعداد : {toPersianNumbers(cartItem.quantity.toString())}</span>
        <div className="flex gap-x-3">
          <button
            onClick={handleAddProduct}
            disabled={isAddingToCart}
            className="bg-primary-900 text-white rounded p-1 disabled:bg-gray-500"
          >
            <HiPlus className="size-4" />
          </button>
          <button
            disabled={isRemovingFromCart}
            onClick={(e) => handleRemoveProduct(e, true)}
            className="disabled:text-gray-500 [&>:first-child]:disabled:text-gray-500 "
          >
            <HiOutlineTrash className="text-rose-500 size-5" />
          </button>
          <button onClick={handleRemoveProduct} className="border rounded p-1">
            <HiMinus className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
