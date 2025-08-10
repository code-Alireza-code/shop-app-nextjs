"use client";

import { Coupon } from "@/types/Coupon";
import Modal from "@/ui/Modal";
import Link from "next/link";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdEdit, MdInfo } from "react-icons/md";
import { useRemoveCoupon } from "../hooks/useRemoveCoupon";

type Props = {
  coupon: Coupon;
};

function CouponActions({ coupon }: Props) {
  const { removeCoupon, isRemovingCoupon } = useRemoveCoupon();
  const [open, setOpen] = useState(false);
  const handleDeleteCoupon = async () => {
    await removeCoupon(coupon._id, { onSuccess: () => setOpen(false) });
  };
  return (
    <div className="flex items-center justify-center gap-x-4">
      <Link className="text-primary-900 " href={`/admin/coupons/${coupon._id}`}>
        <MdInfo className="size-5" />
      </Link>
      <Link
        href={`/admin/coupons/edit/${coupon._id}`}
        className="text-green-500"
      >
        <MdEdit className="size-5" />
      </Link>
      <button className="text-error" onClick={() => setOpen(true)}>
        <IoMdTrash className="size-5" />
      </button>
      {open && (
        <Modal
          onClose={() => setOpen(false)}
          open={open}
          title={`آیا از حذف ${coupon.code} مطمئن هستید ؟`}
        >
          <div className="flex items-center justify-between gap-x-24">
            <button
              className="btn btn--secondary text-error border-error hover:bg-red-500/70 hover:text-white grow disabled:bg-gray-500 disabled:text-white disabled:border-none"
              onClick={handleDeleteCoupon}
              disabled={isRemovingCoupon}
            >
              {isRemovingCoupon ? "در حال حذف" : "حذف شود"}
            </button>
            <button
              className="btn btn--primary grow"
              onClick={() => setOpen(false)}
            >
              لغو
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CouponActions;
