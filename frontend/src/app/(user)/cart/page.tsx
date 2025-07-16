"use client";

import { useGetUser } from "@/hooks/useAuth";
import Loading from "@/ui/Loading";
import Link from "next/link";
import CartItem from "./_/components/CartItem";
import CartSummary from "./_/components/CartSummary";

function CartPage() {
  const { user, cart, isLaodingUser } = useGetUser();

  if (isLaodingUser) return <Loading />;
  if (!user)
    return (
      <div className="flex flex-col gap-y-10 items-center">
        <h2 className="text-2xl font-bold">سبد خرید شما خالی است !</h2>
        <p>
          برای مشاهده سبد خرید به حساب کاربری خود
          <Link href="/auth" className="underline text-primary-900">
            &nbsp;وارد شوید
          </Link>
          .
        </p>
      </div>
    );

  if (!user.cart?.products || user.cart.products.length === 0)
    return <h2 className="text-2xl font-bold">سبد خرید شما خالی است !</h2>;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className=" col-span-3 space-y-5">
        {cart &&
          cart.productDetail.map((item) => (
            <CartItem key={item._id} cartItem={item} />
          ))}
      </div>
      <div className="col-span-1">
        <CartSummary payDetail={cart.payDetail} />
      </div>
    </div>
  );
}

export default CartPage;
