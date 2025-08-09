"use client";

import { useGetAllCoupons } from "@/hooks/useCoupon";
import Loading from "@/ui/Loading";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";
import CouponsTable from "./_/components/CouponsTable";

function CouponsPage() {
  const { coupons, isLoadingCoupons } = useGetAllCoupons();

  if (isLoadingCoupons) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between pt-2 mb-5">
        <h1 className="text-xl font-bold">کدهای تخفیف</h1>
        <Link href="/admin/coupons/add">
          <button className="btn btn--secondary text-sm flex gap-x-2 items-center">
            <IoMdAddCircleOutline className="size-5" />
            <span>افزودن کوپن</span>
          </button>
        </Link>
      </div>
      <CouponsTable coupons={coupons} />
    </div>
  );
}

export default CouponsPage;
