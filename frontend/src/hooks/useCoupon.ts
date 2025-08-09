import { getAllCouponsApi, getCouponByIdApi } from "@/services/couponService";
import { Coupon } from "@/types/Coupon";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCoupons = () => {
  const { data, isLoading: isLoadingCoupons } = useQuery({
    queryKey: ["all-coupons"],
    queryFn: getAllCouponsApi,
    retry: 2,
  });

  const { coupons }: { coupons: Coupon[] } = data || {};

  return { coupons, isLoadingCoupons };
};

export const useGetCouponById = (couponId: string) => {
  const { data, isLoading: isLoadingCoupon } = useQuery({
    queryKey: ["coupon-by-id", couponId],
    queryFn: () => getCouponByIdApi(couponId),
    retry: 2,
  });

  const { coupon }: { coupon: Coupon } = data || {};

  return { coupon, isLoadingCoupon };
};
