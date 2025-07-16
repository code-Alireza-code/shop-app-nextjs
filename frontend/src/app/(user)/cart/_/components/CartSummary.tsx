"use client";

import { Cart } from "@/types/User";
import { toPersianNumbersWithComma } from "@/utils/numberFormatter";
import { useCreatePayment } from "../hooks/useCreatePayment";
import { useRouter } from "next/navigation";

type Props = {
  payDetail: Cart["payDetail"];
};

function CartSummary({ payDetail }: Props) {
  const { createPayment, isCreatingPayment } = useCreatePayment();
  const router = useRouter();

  const handleCreatePayment = async () => {
    await createPayment(undefined, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <div className="border p-4 rounded-xl flex flex-col gap-y-4">
      <h3 className="font-bold text-center">اطلاعات پرداخت</h3>
      <div className="flex items-center justify-between">
        <span>جمع کل :</span>
        <span className="text-gray-400">
          {toPersianNumbersWithComma(payDetail.totalGrossPrice)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span>تخفیف :</span>
        <span className="text-rose-500">
          {toPersianNumbersWithComma(payDetail.totalOffAmount)} -
        </span>
      </div>
      <div className="flex items-center justify-between font-semibold">
        <span>مبلغ قابل پرداخت :</span>
        <span>{toPersianNumbersWithComma(payDetail.totalPrice)}</span>
      </div>
      <button
        onClick={handleCreatePayment}
        disabled={isCreatingPayment}
        className="btn btn--primary disabled:bg-gray-400"
      >
        ثبت سفارش
      </button>
    </div>
  );
}

export default CartSummary;
