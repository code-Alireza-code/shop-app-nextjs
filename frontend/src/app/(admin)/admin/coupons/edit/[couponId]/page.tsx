"use client";

import { useGetCouponById } from "@/hooks/useCoupon";
import Loading from "@/ui/Loading";
import { useParams } from "next/navigation";
import AddCouponForm from "../../_/components/AddCouponForm";

function EditCouponPage() {
  const { couponId } = useParams();
  const { coupon, isLoadingCoupon } = useGetCouponById(couponId as string);

  if (isLoadingCoupon) return <Loading />;
  return (
    <div>
      <AddCouponForm coupon={coupon} />
    </div>
  );
}

export default EditCouponPage;
