import { use } from "react";

type Props = {
  params: Promise<{ couponId: string }>;
};

function SingleCouponPage({ params }: Props) {
  const { couponId } = use(params);
  console.log(couponId);
  return <div>single coupon page</div>;
}

export default SingleCouponPage;
