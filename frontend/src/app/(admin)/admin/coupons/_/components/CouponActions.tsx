import { Coupon } from "@/types/Coupon";
import Link from "next/link";
import { IoMdTrash } from "react-icons/io";
import { MdEdit, MdInfo } from "react-icons/md";

type Props = {
  coupon: Coupon;
};

function CouponActions({ coupon }: Props) {
  return (
    <div className="flex items-center justify-center gap-x-4">
      <Link className="text-primary-900 " href={`/admin/couopns/${coupon._id}`}>
        <MdInfo className="size-5" />
      </Link>
      <Link
        href={`/admin/coupons/edit/${coupon._id}`}
        className="text-green-500"
      >
        <MdEdit className="size-5" />
      </Link>
      <button className="text-error">
        <IoMdTrash className="size-5" />
      </button>
    </div>
  );
}

export default CouponActions;
